/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// inheritance
import { AuthModule } from "./AuthModule";
// app
import { PublicClientSPAConfiguration, buildPublicClientSPAConfiguration } from "../config/PublicClientSPAConfiguration";
// request
import { AuthenticationParameters } from "../../request/AuthenticationParameters";
import { TokenExchangeParameters } from "../../request/TokenExchangeParameters";
// response
import { TokenResponse } from "../../response/TokenResponse";
import { ClientConfigurationError } from "../../error/ClientConfigurationError";
import { AuthorityFactory } from "../../auth/authority/AuthorityFactory";
import { ServerCodeRequestParameters } from "../../server/ServerCodeRequestParameters";
import { CodeResponse } from "../../response/CodeResponse";
import { UrlString } from "../../url/UrlString";
import { ServerAuthorizationCodeResponse, validateServerAuthorizationCodeResponse } from "../../server/ServerAuthorizationCodeResponse";
import { ClientAuthError } from "../../error/ClientAuthError";
import { TemporaryCacheKeys, PersistentCacheKeys } from "../../utils/Constants";
import { ServerTokenRequestParameters } from "../../server/ServerTokenRequestParameters";
import { ServerAuthorizationTokenResponse, validateServerAuthorizationTokenResponse } from "../../server/ServerAuthorizationTokenResponse";
import { ResponseHandler } from "../../response/ResponseHandler";

/**
 * AuthorizationCodeModule class
 * 
 * Object instance which will construct requests to send to and handle responses from the Microsoft STS using the authorization code flow.
 * 
 */
export class AuthorizationCodeModule extends AuthModule {

    // Application config
    private clientConfig: PublicClientSPAConfiguration;

    constructor(configuration: PublicClientSPAConfiguration) {
        super({
            loggerOptions: configuration.loggerOptions,
            storageInterface: configuration.storageInterface,
            networkInterface: configuration.networkInterface,
            cryptoInterface: configuration.cryptoInterface
        });
        this.clientConfig = buildPublicClientSPAConfiguration(configuration);
        this.defaultAuthorityInstance = AuthorityFactory.createInstance(this.clientConfig.auth.authority || AuthorityFactory.DEFAULT_AUTHORITY, this.networkClient);
    }

    async createLoginUrl(request: AuthenticationParameters): Promise<string> {
        return this.createUrl(request, true);
    }

    async createAcquireTokenUrl(request: AuthenticationParameters): Promise<string> {
        return this.createUrl(request, false);
    }

    private async createUrl(request: AuthenticationParameters, isLoginCall: boolean): Promise<string> {
        // Initialize authority or use default, and perform discovery endpoint check
        const acquireTokenAuthority = (request && request.authority) ? AuthorityFactory.createInstance(request.authority, this.networkClient) : this.defaultAuthorityInstance;
        try {
            await acquireTokenAuthority.resolveEndpointsAsync();
        } catch (e) {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError(e);
        }

        // Create and validate request parameters
        let requestParameters: ServerCodeRequestParameters;
        try {
            requestParameters = new ServerCodeRequestParameters(
                acquireTokenAuthority,
                this.clientConfig.auth.clientId,
                request,
                this.getRedirectUri(),
                this.cryptoObj,
                isLoginCall
            );

            // Check for SSO
            if (!requestParameters.isSSOParam(this.getAccount())) {
                // TODO: Check for ADAL SSO
            }

            // Update required cache entries for request
            this.cacheManager.updateCacheEntries(requestParameters, request.account);

            // Populate query parameters (sid/login_hint/domain_hint) and any other extraQueryParameters set by the developer
            requestParameters.populateQueryParams();

            const urlNavigate = await requestParameters.createNavigateUrl();

            // Cache token request
            const tokenRequest: TokenExchangeParameters = {
                scopes: requestParameters.scopes.getOriginalScopesAsArray(),
                resource: request.resource,
                codeVerifier: requestParameters.generatedPkce.verifier,
                extraQueryParameters: request.extraQueryParameters,
                authority: requestParameters.authorityInstance.canonicalAuthority,
                correlationId: requestParameters.correlationId
            };

            this.cacheStorage.setItem(TemporaryCacheKeys.REQUEST_PARAMS, this.cryptoObj.base64Encode(JSON.stringify(tokenRequest)));

            return urlNavigate;
        } catch (e) {
            this.cacheManager.resetTempCacheItems(requestParameters && requestParameters.state);
            throw e;
        }
    }

    async acquireToken(request: TokenExchangeParameters, codeResponse: CodeResponse): Promise<TokenResponse> {
        if (!codeResponse || !codeResponse.code) {
            this.cacheManager.resetTempCacheItems(codeResponse.userRequestState);
            throw ClientAuthError.createAuthCodeNullOrEmptyError();
        }

        const acquireTokenAuthority = (request && request.authority) ? AuthorityFactory.createInstance(request.authority, this.networkClient) : this.defaultAuthorityInstance;
        if (!acquireTokenAuthority.discoveryComplete()) {
            try {
                await acquireTokenAuthority.resolveEndpointsAsync();
            } catch (e) {
                this.cacheManager.resetTempCacheItems(codeResponse.userRequestState);
                throw ClientAuthError.createEndpointDiscoveryIncompleteError(e);
            }
        }

        const { tokenEndpoint } = acquireTokenAuthority;
        let tokenReqParams;
        try {
            const tokenRequest: TokenExchangeParameters = request || this.getCachedRequest();
            tokenReqParams = new ServerTokenRequestParameters(
                this.clientConfig.auth.clientId,
                tokenRequest,
                codeResponse,
                this.getRedirectUri(),
                this.cryptoObj
            );

            const acquiredTokenResponse = await this.networkClient.sendPostRequestAsync<ServerAuthorizationTokenResponse>(
                tokenEndpoint,
                {
                    body: tokenReqParams.createRequestBody(),
                    headers: tokenReqParams.createRequestHeaders()
                }
            );

            validateServerAuthorizationTokenResponse(acquiredTokenResponse);
            const responseHandler = new ResponseHandler(this.clientConfig.auth.clientId, this.cacheStorage, this.cacheManager, this.cryptoObj);
            const tokenResponse = responseHandler.createTokenResponse(acquiredTokenResponse, tokenReqParams.state);
            this.account = tokenResponse.account;
            return tokenResponse;
        } catch (e) {
            this.cacheManager.resetTempCacheItems(codeResponse.userRequestState);
            this.account = null;
            throw e;
        }
    }

    // #region Response Handling

    public handleFragmentResponse(hashFragment: string): CodeResponse {
        // Deserialize and validate hash fragment response parameters
        const hashUrlString = new UrlString(hashFragment);
        const hashParams = hashUrlString.getDeserializedHash<ServerAuthorizationCodeResponse>();
        try {
            validateServerAuthorizationCodeResponse(hashParams, this.cacheStorage.getItem(TemporaryCacheKeys.REQUEST_STATE), this.cryptoObj);

            // Cache client info
            this.cacheStorage.setItem(PersistentCacheKeys.CLIENT_INFO, hashParams.client_info);

            // Create response object
            const response: CodeResponse = {
                code: hashParams.code,
                userRequestState: hashParams.state
            };

            return response;
        } catch(e) {
            this.cacheManager.resetTempCacheItems(hashParams && hashParams.state);
            throw e;
        }
    }

    // #endregion

    // #region Helpers

    private getCachedRequest(): TokenExchangeParameters {
        try {
            const encodedTokenRequest = this.cacheStorage.getItem(TemporaryCacheKeys.REQUEST_PARAMS);
            const parsedRequest = JSON.parse(this.cryptoObj.base64Decode(encodedTokenRequest)) as TokenExchangeParameters;
            this.cacheStorage.removeItem(TemporaryCacheKeys.REQUEST_PARAMS);
            return parsedRequest;
        } catch (err) {
            throw ClientAuthError.createTokenRequestCacheError(err);
        }
    }
    
    // #endregion

    // #region Getters and setters

    /**
     *
     * Use to get the redirect uri configured in MSAL or null.
     * Evaluates redirectUri if its a function, otherwise simply returns its value.
     * @returns {string} redirect URL
     *
     */
    public getRedirectUri(): string {
        if (this.clientConfig.auth.redirectUri) {
            if (typeof this.clientConfig.auth.redirectUri === "function") {
                return this.clientConfig.auth.redirectUri();
            }
            return this.clientConfig.auth.redirectUri;
        } else {
            throw ClientConfigurationError.createRedirectUriEmptyError();
        }
    }

    /**
     * Use to get the post logout redirect uri configured in MSAL or null.
     * Evaluates postLogoutredirectUri if its a function, otherwise simply returns its value.
     *
     * @returns {string} post logout redirect URL
     */
    public getPostLogoutRedirectUri(): string {
        if (this.clientConfig.auth.postLogoutRedirectUri) {
            if (typeof this.clientConfig.auth.postLogoutRedirectUri === "function") {
                return this.clientConfig.auth.postLogoutRedirectUri();
            }
            return this.clientConfig.auth.postLogoutRedirectUri;
        } else {
            throw ClientConfigurationError.createPostLogoutRedirectUriEmptyError();
        }
    }

    // #endregion
}

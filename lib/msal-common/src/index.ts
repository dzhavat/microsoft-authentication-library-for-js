/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @packageDocumentation
 * @module @azure/msal-common
 */

export { AuthorizationCodeClient} from "./client/AuthorizationCodeClient";
export { BrokerAuthorizationCodeClient } from "./client/broker/BrokerAuthorizationCodeClient";
export { BrokerRefreshTokenClient } from "./client/broker/BrokerRefreshTokenClient";
export { DeviceCodeClient } from "./client/DeviceCodeClient";
export { RefreshTokenClient } from "./client/RefreshTokenClient";
export { ClientCredentialClient } from "./client/ClientCredentialClient";
export { OnBehalfOfClient } from "./client/OnBehalfOfClient";
export { SilentFlowClient } from "./client/SilentFlowClient";
export { UsernamePasswordClient } from "./client/UsernamePasswordClient";
export { AuthOptions, SystemOptions, LoggerOptions, DEFAULT_SYSTEM_OPTIONS } from "./config/ClientConfiguration";
export { ClientConfiguration } from "./config/ClientConfiguration";
// Account
export { AccountInfo } from "./account/AccountInfo";
export { AuthToken } from "./account/AuthToken";
export { AuthToken as IdToken } from "./account/AuthToken";
export { TokenClaims } from "./account/TokenClaims";
export { TokenClaims as IdTokenClaims } from "./account/TokenClaims";
// Authority
export { Authority } from "./authority/Authority";
export { AuthorityOptions } from "./authority/AuthorityOptions";
export { AuthorityFactory } from "./authority/AuthorityFactory";
export { AuthorityType } from "./authority/AuthorityType";
export { ProtocolMode } from "./authority/ProtocolMode";
export { ScopeSet } from "./request/ScopeSet";
// Cache
export { CacheManager, DefaultStorageClass } from "./cache/CacheManager";
export { AccountCache, AccessTokenCache, IdTokenCache, RefreshTokenCache, AppMetadataCache, ValidCacheType, ValidCredentialType } from "./cache/utils/CacheTypes";
export { CredentialEntity } from "./cache/entities/CredentialEntity";
export { AppMetadataEntity } from "./cache/entities/AppMetadataEntity";
export { AccountEntity } from "./cache/entities/AccountEntity";
export { IdTokenEntity } from "./cache/entities/IdTokenEntity";
export { AccessTokenEntity } from "./cache/entities/AccessTokenEntity";
export { RefreshTokenEntity } from "./cache/entities/RefreshTokenEntity";
export { ServerTelemetryEntity } from "./cache/entities/ServerTelemetryEntity";
export { AuthorityMetadataEntity } from "./cache/entities/AuthorityMetadataEntity";
export { ThrottlingEntity } from "./cache/entities/ThrottlingEntity";
export { ICachePlugin } from "./cache/interface/ICachePlugin";
export { TokenCacheContext } from "./cache/persistence/TokenCacheContext";
export { ISerializableTokenCache } from "./cache/interface/ISerializableTokenCache";
export { CacheRecord } from "./cache/entities/CacheRecord";
// Network Interface
export { INetworkModule, NetworkRequestOptions, StubbedNetworkModule } from "./network/INetworkModule";
export { NetworkManager, NetworkResponse } from "./network/NetworkManager";
export { ThrottlingUtils } from "./network/ThrottlingUtils";
export { RequestThumbprint } from "./network/RequestThumbprint";
export { IUri } from "./url/IUri";
export { UrlString } from "./url/UrlString";
// Crypto Interface
export { ICrypto, PkceCodes, DEFAULT_CRYPTO_IMPLEMENTATION } from "./crypto/ICrypto";
export { SignedHttpRequest } from "./crypto/SignedHttpRequest";
export { PopTokenGenerator } from "./crypto/PopTokenGenerator";
// Request and Response
export { BaseAuthRequest } from "./request/BaseAuthRequest";
export { CommonAuthorizationUrlRequest } from "./request/CommonAuthorizationUrlRequest";
export { CommonAuthorizationCodeRequest } from "./request/CommonAuthorizationCodeRequest";
export { CommonRefreshTokenRequest } from "./request/CommonRefreshTokenRequest";
export { CommonClientCredentialRequest } from "./request/CommonClientCredentialRequest";
export { CommonOnBehalfOfRequest } from "./request/CommonOnBehalfOfRequest";
export { CommonSilentFlowRequest } from "./request/CommonSilentFlowRequest";
export { CommonDeviceCodeRequest } from "./request/CommonDeviceCodeRequest";
export { CommonEndSessionRequest } from "./request/CommonEndSessionRequest";
export { CommonUsernamePasswordRequest } from "./request/CommonUsernamePasswordRequest";
export { BrokeredAuthorizationCodeRequest } from "./request/broker/BrokeredAuthorizationCodeRequest";
export { BrokeredAuthorizationUrlRequest } from "./request/broker/BrokeredAuthorizationUrlRequest";
export { BrokeredRefreshTokenRequest } from "./request/broker/BrokeredRefreshTokenRequest";
export { BrokeredSilentFlowRequest } from "./request/broker/BrokeredSilentFlowRequest";
export { AzureRegion } from "./authority/AzureRegion";
export { AzureRegionConfiguration } from "./authority/AzureRegionConfiguration";
export { AuthenticationResult } from "./response/AuthenticationResult";
export { BrokerAuthenticationResult } from "./response/BrokerAuthenticationResult";
export { AuthorizationCodePayload } from "./response/AuthorizationCodePayload";
export { ServerAuthorizationCodeResponse } from "./response/ServerAuthorizationCodeResponse";
export { ServerAuthorizationTokenResponse } from "./response/ServerAuthorizationTokenResponse";
export { DeviceCodeResponse } from "./response/DeviceCodeResponse";
// Logger Callback
export { ILoggerCallback, LogLevel, Logger } from "./logger/Logger";
// Errors
export { InteractionRequiredAuthError } from "./error/InteractionRequiredAuthError";
export { AuthError, AuthErrorMessage } from "./error/AuthError";
export { ServerError } from "./error/ServerError";
export { ClientAuthError, ClientAuthErrorMessage } from "./error/ClientAuthError";
export { ClientConfigurationError, ClientConfigurationErrorMessage } from "./error/ClientConfigurationError";
// Constants and Utils
export { Constants, OIDC_DEFAULT_SCOPES, PromptValue, PersistentCacheKeys, ResponseMode, CacheSchemaType, CredentialType, CacheType, CacheAccountType, AuthenticationScheme } from "./utils/Constants";
export { StringUtils } from "./utils/StringUtils";
export { StringDict } from "./utils/MsalTypes";
export { ProtocolUtils, RequestStateObject, LibraryStateObject } from "./utils/ProtocolUtils";
export { TimeUtils } from "./utils/TimeUtils";
// Telemetry
export { ServerTelemetryManager } from "./telemetry/server/ServerTelemetryManager";
export { ServerTelemetryRequest } from "./telemetry/server/ServerTelemetryRequest";
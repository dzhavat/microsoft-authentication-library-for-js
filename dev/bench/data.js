window.BENCHMARK_DATA = {
  "lastUpdate": 1700768247315,
  "repoUrl": "https://github.com/dzhavat/microsoft-authentication-library-for-js",
  "entries": {
    "msal-node client-credential Regression Test": [
      {
        "commit": {
          "author": {
            "email": "thomas.norling@microsoft.com",
            "name": "Thomas Norling",
            "username": "tnorling"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "70ab381446cf45f42b70f2ad3c59560783e6a627",
          "message": "Minor perf optimization when creating hidden iframe (#6705)\n\nUsing `document.body` directly is more performant than searching the\r\ndocument for body tags.\r\n\r\nCurrent P95 for hidden iframe creation is ~70ms which represents a\r\nsignificant portion of the time spent on client-side operations in\r\nssoSilent/ATS",
          "timestamp": "2023-11-17T15:46:30-08:00",
          "tree_id": "c79478c25361003b900f2bc75bc13cd45bcccc24",
          "url": "https://github.com/dzhavat/microsoft-authentication-library-for-js/commit/70ab381446cf45f42b70f2ad3c59560783e6a627"
        },
        "date": 1700768245649,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "ConfidentialClientApplication#acquireTokenByClientCredential-fromCache-resourceIsFirstItemInTheCache",
            "value": 193137,
            "range": "±2.04%",
            "unit": "ops/sec",
            "extra": "225 samples"
          },
          {
            "name": "ConfidentialClientApplication#acquireTokenByClientCredential-fromCache-resourceIsLastItemInTheCache",
            "value": 183929,
            "range": "±1.83%",
            "unit": "ops/sec",
            "extra": "224 samples"
          }
        ]
      }
    ]
  }
}
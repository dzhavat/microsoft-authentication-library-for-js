window.BENCHMARK_DATA = {
  "lastUpdate": 1707210450938,
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
      },
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
          "id": "e7a55511680aec602310f63db0bb5b7d2b07fab3",
          "message": "Fix electron webpack samples (#6864)\n\nThe electron webpack samples' transforms weren't updated when we changed\r\nto .cjs extensions which breaks native module imports (node extensions).\r\nThis PR addresses by adding .cjs to the list of files to transform",
          "timestamp": "2024-02-01T14:40:23-08:00",
          "tree_id": "f52a9b6647fc2a3d908aae83ec2062eff9175110",
          "url": "https://github.com/dzhavat/microsoft-authentication-library-for-js/commit/e7a55511680aec602310f63db0bb5b7d2b07fab3"
        },
        "date": 1707210449315,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "ConfidentialClientApplication#acquireTokenByClientCredential-fromCache-resourceIsFirstItemInTheCache",
            "value": 182196,
            "range": "±1.67%",
            "unit": "ops/sec",
            "extra": "220 samples"
          },
          {
            "name": "ConfidentialClientApplication#acquireTokenByClientCredential-fromCache-resourceIsLastItemInTheCache",
            "value": 183836,
            "range": "±1.77%",
            "unit": "ops/sec",
            "extra": "220 samples"
          }
        ]
      }
    ]
  }
}
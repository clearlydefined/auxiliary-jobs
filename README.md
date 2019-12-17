# auxiliary-jobs
ClearlyDefined auxiliary jobs

# Prerequisites
Install [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) v3.x

# Debug Locally
Add local.settings.json:
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "STORAGE_CONNECTION_STRING": ""
  }
}
```

Debug > Attach to Node Functions

Run `curl -X POST -H "Content-Type:application/json" --data {} http://localhost:7071/admin/functions/QueuesMessageCountChecker`
# auxiliary-jobs
ClearlyDefined auxiliary jobs

# Debug Locally
Add local.settings.json:
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```
Temporarily update function.json to run more frequently.

Debug > Attach to Node Functions

Run `curl --request POST -H "Content-Type:application/json" --data {} http://localhost:7071/admin/functions/QueuesSizeChecker`
# auxiliary-jobs

ClearlyDefined auxiliary jobs: /* Function App -> auxiliary-jobs */
* QueuesMessageCountChecker - count the number of messages in each queue based on a schedule and report the results in Azure Portal 

# Prerequisites

* Install [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) 
  * use v3.x (_as written v4+ is not compatible_)
  * Node v14 is the highest supported node for v3.x (_See [Supported versions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=javascript%2Cwindows%2Cazure-cli&pivots=nodejs-model-v4#supported-versions)_)
* How to run from [Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=node-v4%2Cpython-v2%2Cisolated-process%2Cquick-create&pivots=programming-language-javascript)

# Debug Locally
Add local.settings.json to the root:
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "<storage_account_connection_string_for_auxilary-job>",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "STORAGE_CONNECTION_STRING": "<storage_account_connection_string_for_queue>"
  }
}
```

Debug > Attach to Node Functions

Run `curl -X POST -H "Content-Type:application/json" --data {} http://localhost:7071/admin/functions/QueuesMessageCountChecker`
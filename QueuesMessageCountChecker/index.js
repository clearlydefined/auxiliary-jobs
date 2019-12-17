// This Azure function logs Azure storage queues' message counts to Application Insights, so that alerts can be set up.

const { QueueServiceClient } = require('@azure/storage-queue');

module.exports = async (context) => {
  const queueServiceClient = QueueServiceClient.fromConnectionString(process.env.STORAGE_CONNECTION_STRING);
  for await (const item of queueServiceClient.listQueues()) {
    const queueName = item.name;
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const { approximateMessagesCount } = await queueClient.getProperties();
    context.log({ queueName, messageCount: approximateMessagesCount } );
  }
};
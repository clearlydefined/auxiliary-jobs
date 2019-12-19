// Copyright (c) Microsoft Corporation and others. Made available under the MIT license.
// SPDX-License-Identifier: MIT

// This Azure function logs Azure storage queues' message counts to Application Insights, so that alerts can be set up.

const { QueueServiceClient } = require('@azure/storage-queue');
const insights = require('../shared/insights');

module.exports = async (context) => {
  const queueServiceClient = QueueServiceClient.fromConnectionString(process.env.STORAGE_CONNECTION_STRING);
  for await (const item of queueServiceClient.listQueues()) {
    const queueName = item.name;
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const { approximateMessagesCount } = await queueClient.getProperties();
    insights.trackEvent({ name: 'Queue message count', properties: { queueName, messageCount: approximateMessagesCount } });
    context.log('Queue', queueName, approximateMessagesCount);
  }
};

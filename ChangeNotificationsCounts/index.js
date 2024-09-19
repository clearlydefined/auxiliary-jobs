const { BlobServiceClient } = require('@azure/storage-blob');
const insights = require('../shared/insights');

module.exports = async (context) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.STORAGE_CONNECTION_STRING);
  const containerName = 'changes-notifications';
  const blobName = 'changes/2024-09-18-00';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  const downloadBlockBlobResponse = await blobClient.download(0);
  const downloadedContent = await streamToString(downloadBlockBlobResponse.readableStreamBody);
  const lineCount = downloadedContent.split('\n').length;

  insights.trackEvent({ name: 'Changeset coordinate count', properties: { containerName, blobName, lineCount } });
  context.log('Container', containerName, 'Blob', blobName, 'Line count', lineCount);
};

// Helper function to convert a readable stream to a string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data.toString());
    });
    readableStream.on('end', () => {
      resolve(chunks.join(''));
    });
    readableStream.on('error', reject);
  });
}
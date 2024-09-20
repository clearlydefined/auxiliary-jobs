const { BlobServiceClient } = require('@azure/storage-blob');
const insights = require('../shared/insights');

module.exports = async (context) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.STORAGE_CONNECTION_STRING);
  const containerName = 'changes-notifications';

  const now = new Date();
  const tenHoursAgo = new Date(now.getTime() - 10 * 60 * 60 * 1000);

  const changesetPath = getChangesetName(tenHoursAgo);
  context.log('changesetPath:', changesetPath);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(changesetPath);

  const downloadBlockBlobResponse = await blobClient.download(0);
  const downloadedContent = await streamToString(downloadBlockBlobResponse.readableStreamBody);
  const allCoordinatesCount = downloadedContent.split('\n').length;
  const goCoordinatesCount = downloadedContent.split('\n').filter(line => line.startsWith('go/golang')).length;

  insights.trackEvent({ name: 'Changeset coordinate count', properties: { containerName, changesetPath, allCoordinatesCount, goCoordinatesCount } });
  context.log('Container', containerName, 'Changeset', changesetPath, 'Coordinates Count', allCoordinatesCount, 'Go Coordinates Count', goCoordinatesCount);
};

function getChangesetName(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hour = date.getUTCHours();
  return `changes/${year}-${month}-${day}-${hour}`;
}

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
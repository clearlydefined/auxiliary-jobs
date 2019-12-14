module.exports = async function start(context, myTimer) {
  const timeStamp = new Date().toISOString();
  if (myTimer.IsPastDue) {
    context.log('JavaScript is running late!');
  }
  context.log('JavaScript timer trigger function ran!', timeStamp, process.env.FUNCTIONS_WORKER_RUNTIME);   
};
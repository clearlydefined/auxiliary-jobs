// Copyright (c) Microsoft Corporation and others. Made available under the MIT license.
// SPDX-License-Identifier: MIT

let client = {};
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  const appInsights = require('applicationinsights');
  appInsights.setup().start();
  insights = appInsights.defaultClient;
} else {
  client.trackEvent = console.log;
  client.trackTrace = console.log;
  client.trackException = console.error;
  client.trackMetric = console.log;
}

module.exports = client;

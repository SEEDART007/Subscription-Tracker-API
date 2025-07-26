const { Client: WorkflowClient } = require('@upstash/workflow');

const QSTASH_URL = 'http://127.0.0.1:8081'
const QSTASH_TOKEN="eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0="

const workflowClient = new WorkflowClient({
  baseUrl: QSTASH_URL,
  token: QSTASH_TOKEN,
});

module.exports = {
  workflowClient,
};




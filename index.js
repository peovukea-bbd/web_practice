require('dotenv').config();
const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello, World from Peo!' });
});

// Export the handler for AWS Lambda
const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

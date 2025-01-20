const assert = require('assert');
const http = require('http');
const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello, World!' });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);

  // Run the test after the server starts
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: '/',
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const parsedData = JSON.parse(data);
      assert.strictEqual(parsedData.message, 'Hello, World!');
      console.log('Test passed!');
      server.close();
    });
  });

  req.on('error', (error) => {
    console.error(`Test failed: ${error.message}`);
    server.close();
  });

  req.end();
});

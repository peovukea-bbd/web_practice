require('dotenv').config()
const express = require('express');
const app = express();


const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
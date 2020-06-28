const express = require('express');
const app = express();

const { port } = require('./config');

// Necessary if there is no .env file
const PORT = port || 5000;

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

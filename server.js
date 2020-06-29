const express = require('express');
const app = express();

// Dotenv files
const { port } = require('./env');

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

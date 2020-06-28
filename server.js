const express = require('express');
const app = express();

// Dotenv files
const { PORT } = require('./config');

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

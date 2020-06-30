import express from 'express';

// Dotenv files
import { port } from './env';

const app = express();

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

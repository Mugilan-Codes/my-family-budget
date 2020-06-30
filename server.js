import express from 'express';
import cors from 'cors';

const app = express();

import { port } from './env';

app.use(cors());

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

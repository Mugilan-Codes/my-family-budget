import express from 'express';
import cors from 'cors';

import { port } from './env';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

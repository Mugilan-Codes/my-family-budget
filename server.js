import express from 'express';
import cors from 'cors';

const app = express();

import { port } from './src/config';
import mountRoutes from './routes';

app.use(cors());
app.use(express.json({ extended: false }));

mountRoutes(app);

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

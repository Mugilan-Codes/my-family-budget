import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

import { port } from './src/config';
import mountRoutes from './src/routes';
import { Logger } from './src/middleware/logger';

app.use(cors());
app.use(express.json({ extended: false }));
app.use(Logger);

mountRoutes(app);

// Celebrate library error handler
app.use(errors());
// Custom server error handler
app.use((err, req, res, next) => {
  if (err.joi) {
    return res.status(400).json({ error: err.joi.message });
  }

  return res.status(500).send(err);
});

app.use((req, res) => {
  res.status(404).send('404 not found');
});

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

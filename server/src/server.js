import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

import { port } from './config';
import mountRoutes from './routes';
import { Logger } from './middleware/logger';

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

  console.log(`Stack : ${err.stack}`);
  return res.status(500).send('Server Error');
});

app.get('/', (req, res) => {
  res.send('API Running...awesome');
});

app.use((req, res) => {
  res.status(404).send('404 not found');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

import express from 'express';

const router = express.Router();

router
  .get('/test1', (req, res) => {
    res.send('Test 1 GET');
  })
  .get('/test2', (req, res) => {
    res.send('Test 2 GET');
  });

export default router;

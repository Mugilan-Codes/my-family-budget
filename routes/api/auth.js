import express from 'express';

import { auth } from '../../middleware/auth';

const router = express.Router();

router.get('/', auth, (req, res) => {
  res.send(req.user.id);
});

export default router;

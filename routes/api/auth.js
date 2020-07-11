import express from 'express';

import { auth } from '../../middleware/auth';
import { findById } from '../../helper/queries';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await findById(req.user.id);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;

import express from 'express';
import { celebrate } from 'celebrate';

import { auth } from '../../middleware/auth';
import { addEntryController } from '../../controllers/entries';
import { addPostSchema } from '../../utils/schema';

const router = express.Router();

router.post(
  '/',
  [auth, celebrate({ body: addPostSchema })],
  addEntryController
);

export default router;

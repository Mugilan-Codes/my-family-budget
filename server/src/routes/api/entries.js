import express from 'express';
import { celebrate } from 'celebrate';

import { auth } from '../../middleware/auth';
import {
  addEntryController,
  getAllEntriesController,
  getEntryByIdController,
} from '../../controllers/entries';
import { addPostSchema, validIdSchema } from '../../utils/schema';

const router = express.Router();

router
  .post('/', [auth, celebrate({ body: addPostSchema })], addEntryController)
  .get('/', auth, getAllEntriesController)
  .get(
    '/:id',
    [auth, celebrate({ params: validIdSchema })],
    getEntryByIdController
  );

export default router;

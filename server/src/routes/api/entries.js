import express from 'express';
import { celebrate } from 'celebrate';

import { auth } from '../../middleware/auth';
import {
  addEntryController,
  getAllEntriesController,
  getEntryByIdController,
} from '../../controllers/entries';
import { addPostSchema } from '../../utils/schema';

const router = express.Router();

router
  .post('/', [auth, celebrate({ body: addPostSchema })], addEntryController)
  .get('/', auth, getAllEntriesController)
  .get('/:id', auth, getEntryByIdController);

export default router;

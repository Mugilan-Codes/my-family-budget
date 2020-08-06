import express from 'express';
import { celebrate } from 'celebrate';

import { auth } from '../../middleware/auth';
import {
  addEntryController,
  getAllEntriesController,
  getEntryByIdController,
  deleteEntryByIdController,
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
  )
  .delete(
    '/:id',
    [auth, celebrate({ params: validIdSchema })],
    deleteEntryByIdController
  );

export default router;

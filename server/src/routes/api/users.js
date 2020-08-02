import express from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserController,
  getUserController,
  updateUserController,
  deleteUserController,
} from '../../controllers/users';
import { registerSchema, updateSchema, deleteSchema } from '../../utils/schema';
import { auth } from '../../middleware/auth';

const router = express.Router();

router
  .get('/', auth, getUserController)
  .post('/', celebrate({ body: registerSchema }), registerUserController)
  .put('/', [auth, celebrate({ body: updateSchema })], updateUserController)
  .delete('/', [auth, celebrate({ body: deleteSchema })], deleteUserController);

export default router;

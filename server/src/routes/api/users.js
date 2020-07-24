import express from 'express';
import { celebrate } from 'celebrate';

import {
  registerUser,
  loginUser,
  getUser,
  update,
} from '../../controllers/users';
import { registerSchema, loginSchema, updateSchema } from '../../utils/schema';
import { auth } from '../../middleware/auth';

const router = express.Router();

router
  .get('/', auth, getUser)
  .post('/', celebrate({ body: registerSchema }), registerUser)
  .post('/auth', celebrate({ body: loginSchema }), loginUser)
  .put('/', [auth, celebrate({ body: updateSchema })], update);

export default router;

import express from 'express';
import { celebrate } from 'celebrate';

import { auth } from '../../middleware/auth';
import { getUser, loginUser } from '../../controllers/users';
import { loginSchema } from '../../utils/schema';

const router = express.Router();

router
  .get('/', auth, getUser)
  .post('/', celebrate({ body: loginSchema }), loginUser);

export default router;

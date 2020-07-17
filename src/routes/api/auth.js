import express from 'express';
import { check, oneOf } from 'express-validator';

import { auth } from '../../middleware/auth';
import { getUser, loginUser } from '../../controllers/users';
import { validate, loginSchema } from '../../middleware/validator';
import { celebrate } from 'celebrate';

const router = express.Router();

// todo - remove the validation from here into the middleware
router
  .get('/', auth, getUser)
  .post('/', celebrate({ body: loginSchema }), loginUser);

export default router;

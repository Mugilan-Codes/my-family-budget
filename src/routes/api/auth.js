import express from 'express';
import { check, oneOf } from 'express-validator';

import { auth } from '../../middleware/auth';
import { getUser, loginUser } from '../../controllers/users';

const router = express.Router();

// todo - remove the validation from here into the middleware
router
  .get('/', auth, getUser)
  .post(
    '/',
    [
      oneOf([
        check('email', 'Enter a valid email').isEmail(),
        check('username', 'Username must be valid').isLength({ min: 5 }),
      ]),
      check('password', 'Enter a valid password').isLength({ min: 6 }),
    ],
    loginUser
  );

export default router;

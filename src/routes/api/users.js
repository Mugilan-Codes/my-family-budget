import express from 'express';
import { check } from 'express-validator';

import { registerUser } from '../../controllers/users';
import { validate } from '../../middleware/validator';

const router = express.Router();

router.post(
  '/',
  validate([
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include email').isEmail(),
    check('password', 'Please include password').isLength({ min: 6 }),
    check('username', 'Username must be atleast 5 characters')
      .isLength({ min: 5 })
      .optional({ checkFalsy: true }),
  ]),
  registerUser
);

export default router;

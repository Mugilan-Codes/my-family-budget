import express from 'express';
import { check } from 'express-validator';

import { validate } from '../../middleware/validator';

const router = express.Router();

/**
 * @route          POST api/users
 * @desc           Register User
 * @access         Public
 ** Request Body
 * @param {string} name       Name of the user
 * @param {string} email      Email of the sser
 * @param {string} password   Password for the sser
 * @param {string} [username] Username of the user(Optional)
 */
router.post(
  '/',
  validate([
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include email').isEmail(),
    check('password', 'Please include password').isLength({ min: 6 }),
  ]),
  (req, res) => {
    console.log(req.body);

    res.send('Users Route');
  }
);

export default router;

import express from 'express';
import { check } from 'express-validator';
import bcrypt from 'bcrypt';

import { validate } from '../../middleware/validator';

const router = express.Router();

/**
 * @route          POST api/users
 * @desc           Register User
 * @access         Public
 ** Request Body
 * @param {string} name       Name of the user.
 * @param {string} email      Email of the user.
 * @param {string} password   Password for the user.
 * @param {string} [username=''] Username of the user(Optional).
 */
router.post(
  '/',
  validate([
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include email').isEmail(),
    check('password', 'Please include password').isLength({ min: 6 }),
  ]),
  async (req, res) => {
    const { name, email, password, username } = req.body;

    try {
      const userName = typeof username === 'undefined' ? '' : username;
      // Check if the user already exists using email or username

      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user and return id

      // Return JSONWebToken

      return res.send({ name, email, hashedPassword, userName });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    res.send('Users Route');
  }
);

export default router;

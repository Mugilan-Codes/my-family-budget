import express from 'express';
import { check } from 'express-validator';
import bcrypt, { genSalt } from 'bcrypt';

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
      console.log(
        name,
        email,
        password,
        typeof username === 'undefined' ? '' : username
      );
      const hashedPassword = await bcrypt.hash(password, 10);

      return res.send({ name, email, password, hashedPassword, username });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    res.send('Users Route');
  }
);

export default router;

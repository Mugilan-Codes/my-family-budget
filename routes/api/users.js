import express from 'express';
import { check } from 'express-validator';
import bcrypt from 'bcrypt';
import sqltag from 'sql-template-tag';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { validate } from '../../middleware/validator';
import { pool } from '../../config/pool';
import { jwt_secret } from '../../env';
import { findOne } from '../../helper/queries';
import { status } from '../../helper/status';
import { auth } from '../../middleware/auth';

const router = express.Router();

/**
 * @route          POST api/users
 * @desc           Register User
 * @access         Public
 ** Request Body
 * @param {string} name       Name of the user.
 * @param {string} email      Email of the user.
 * @param {string} password   Password for the user.
 * @param {string} [username] Username of the user(Optional).
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
      // Checks if the user exists (email)
      let user = await findOne({ email });
      if (user) {
        return res
          .status(status.conflict)
          .json({ errors: [{ msg: 'User Exists' }] });
      }

      // converts username to null if empty or undefined
      const userName =
        typeof username === 'undefined' || username === '' ? null : username;

      // Checks if the user exists (username)
      user = await findOne({ username: userName });
      if (user) {
        return res
          .status(status.conflict)
          .json({ errors: [{ msg: 'Username Exists' }] });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const id = uuidv4();
      const c_on = new Date();
      const u_on = new Date();

      // Save user and return id
      user = (
        await pool.query(
          sqltag`INSERT INTO users (
            id,
            name,
            email,
            password,
            username,
            created_on,
            updated_on
          ) VALUES (
            ${id},
            ${name},
            ${email},
            ${hashedPassword},
            ${userName},
            ${c_on},
            ${u_on}
          ) RETURNING id`
        )
      ).rows[0];

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwt_secret, { expiresIn: '3d' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(status.error).send('Server Error');
    }
  }
);

// todo - Update User
/**
 * @route          PUT api/users
 * @desc           Update User
 * @access         Private
 ** Request Body
 * @param {string} [name]       Name of the user.
 * @param {string} [email]      Email of the user.
 * @param {string} [password]   Password for the user.
 * @param {string} [username]   Username of the user.
 */
router.put('/', auth, async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    res.json({ name, email, password, username });
  } catch (err) {
    console.error(err.message);
    res.status(status.error).send('Server Error');
  }
});

//? IS THIS NECESSARY?
/**
 * @route          DELETE api/users
 * @desc           Delete User
 * @access         Private
 */
router.delete('/', auth, async (req, res) => {
  try {
    await pool.query(sqltag`DELETE FROM users WHERE id = ${req.user.id}`);

    return res.json('User Deleted');
  } catch (err) {
    console.error(err.message);
    res.status(status.error).send('Server Error');
  }
});

export default router;

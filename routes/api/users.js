import express from 'express';
import { check } from 'express-validator';
import bcrypt from 'bcrypt';
import sqltag from 'sql-template-tag';
import { v4 as uuidv4 } from 'uuid';

import { validate } from '../../middleware/validator';
import { pool } from '../../config/pool';

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
      let user = (
        await pool.query(sqltag`SELECT * FROM users where email = ${email}`)
      ).rows[0];
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User Exists' }] });
      }

      const userName =
        typeof username === 'undefined' || username === '' ? null : username;

      user = (
        await pool.query(
          sqltag`SELECT * FROM users where username = ${userName}`
        )
      ).rows[0];
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Username Exists' }] });
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

      const result = user.id;

      // Return JSONWebToken

      return res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    res.send('Users Route');
  }
);

export default router;

import express from 'express';
import { check } from 'express-validator';

import { validate } from '../../middleware/validator';
import { registerUser } from '../../controllers/users';

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
  registerUser
);

// // todo - Update User
// /**
//  * @route          PUT api/users
//  * @desc           Update User
//  * @access         Private
//  ** Request Body
//  * @param {string} [name]       Name of the user.
//  * @param {string} [email]      Email of the user.
//  * @param {string} [password]   Password for the user.
//  * @param {string} [username]   Username of the user.
//  */
// router.put('/', auth, async (req, res) => {
//   const { name, email, password, username } = req.body;
//   try {
//     res.json({ name, email, password, username });
//   } catch (err) {
//     console.error(err.message);
//     res.status(status.error).send('Server Error');
//   }
// });

// //? IS THIS NECESSARY?
// /**
//  * @route          DELETE api/users
//  * @desc           Delete User
//  * @access         Private
//  */
// router.delete('/', auth, async (req, res) => {
//   try {
//     await pool.query(sqltag`DELETE FROM users WHERE id = ${req.user.id}`);

//     return res.json('User Deleted');
//   } catch (err) {
//     console.error(err.message);
//     res.status(status.error).send('Server Error');
//   }
// });

export default router;

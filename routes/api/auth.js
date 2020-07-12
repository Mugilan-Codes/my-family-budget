import express from 'express';
import { check } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { auth } from '../../middleware/auth';
import { findOne } from '../../helper/queries';
import { validate } from '../../middleware/validator';
import { jwt_secret } from '../../env';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await findOne({ id: req.user.id });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route          POST api/auth
 * @desc           Authenticate user & Get token
 * @access         Public
 ** Request Body
 * @param {string} email     Email of the user.
 * @param {string} password  Password for the user.
 */
router.post(
  '/',
  validate([
    check('email', 'Please include email').isEmail(),
    check('password', 'Password required').exists(),
  ]),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      // todo - Get username as alternative for email
      let user = await findOne({ email }, true);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

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
      res.status(500).send('Server Error');
    }
  }
);

export default router;

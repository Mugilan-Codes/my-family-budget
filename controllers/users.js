import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import sqltag from 'sql-template-tag';
import jwt from 'jsonwebtoken';

import { findOne } from '../helper/queries';
import { status } from '../helper/status';
import { pool } from '../config/pool';
import { jwt_secret } from '../env';
import { addUser } from '../services/users';

const registerUser = async (req, res, next) => {
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
    user = await addUser({
      id,
      name,
      email,
      userName,
      hashedPassword,
      c_on,
      u_on,
    });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwt_secret, { expiresIn: '3d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    next();
  } catch (err) {
    console.error(err.message);
    res.status(status.error).send('Server Error');
  }
};

export { registerUser };

import jwt from 'jsonwebtoken';

import { findOne } from '../helper/queries';
import { status } from '../helper/status';
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

    // Save user and return id
    user = await addUser({
      name,
      email,
      userName,
      password,
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

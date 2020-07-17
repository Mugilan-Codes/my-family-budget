import { validationResult } from 'express-validator';

import { addUser, retrieveUser } from '../services/users';
import { generateAccessToken } from '../utils/token';
import { comparePassword } from '../utils/crypt';

const registerUser = async (req, res, next) => {
  const { name, email, password, username } = req.body;
  try {
    const user = await addUser({ name, email, password, username });

    if (user.err_msg) {
      return res.status(409).json({ errors: [{ msg: user.err_msg }] });
    }

    const payload = {
      user: { id: user.id },
    };

    const token = generateAccessToken(payload);

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await retrieveUser({ id });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User Not Found' }] });
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;
  try {
    const user = await retrieveUser({ email, username });

    if (user.err_msg) {
      return res.status(401).json({ errors: [{ msg: user.err_msg }] });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = generateAccessToken(payload);

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

export { registerUser, getUser, loginUser };

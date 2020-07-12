import jwt from 'jsonwebtoken';

import { jwt_secret } from '../env';
import { status } from '../helper/status';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res
      .status(status.unauthorized)
      .json({ msg: 'No Token, Authorization Denied' });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(status.unauthorized).json({ msg: 'Token is Invalid' });
  }
};

export { auth };

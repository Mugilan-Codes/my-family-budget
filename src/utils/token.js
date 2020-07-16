import jwt from 'jsonwebtoken';

import { jwt_secret } from '../config';

const generateAccessToken = (payload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwt_secret);
};

export { generateAccessToken, verifyToken };

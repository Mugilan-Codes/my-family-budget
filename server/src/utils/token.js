import jwt from 'jsonwebtoken';

import { jwt_secret } from '../config';

//! Change back to '1h' during production
const generateAccessToken = (payload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: '3d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwt_secret);
};

export { generateAccessToken, verifyToken };

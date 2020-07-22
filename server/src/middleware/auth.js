import { verifyToken } from '../utils/token';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No Token, Authorization Denied' });
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is Invalid' });
  }
};

export { auth };

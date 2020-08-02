import bcrypt from 'bcrypt';

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

export { hashPassword, comparePassword };

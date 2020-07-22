import bcrypt from 'bcrypt';

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = (password, password2) => {
  return bcrypt.compare(password, password2);
};

export { hashPassword, comparePassword };

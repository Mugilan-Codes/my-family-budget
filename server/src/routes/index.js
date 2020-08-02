import users from './api/users';
import auth from './api/auth';

export default (app) => {
  app.use('/api/users', users);
  app.use('/api/auth', auth);
};

import users from './api/users';
import auth from './api/auth';
import entries from './api/entries';

export default (app) => {
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/entries', entries);
};

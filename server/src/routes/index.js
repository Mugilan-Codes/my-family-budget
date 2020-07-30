import users from './api/users';
import admins from './api/admins';

export default (app) => {
  app.use('/api/users', users);
  app.use('/api/admins', admins);
};

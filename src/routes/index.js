import users from './api/users';

export default (app) => {
  app.use('/api/users', users);
};

const pool = require('./pool');

pool.on('connect', () => {
  console.log('Connected to DB');
});

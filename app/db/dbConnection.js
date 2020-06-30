import { pool } from './pool';

pool.on('connect', () => {
  console.log('Connected to DB');
});

import pool from './pool';
import { query } from './dbQuery';

pool.on('connect', () => {
  console.log('Connected to DB');
});

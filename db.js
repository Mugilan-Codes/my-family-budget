import { pool } from './pool';
import { sqltag } from 'sql-template-tag';

const createDevTables = async () => {
  try {
    const res = await pool.query(
      sqltag`CREATE TABLE demo (id int, name varchar(30))`
    );

    console.log('created: ', res);
  } catch (err) {
    console.error(err.message);
  }
};

export { createDevTables };

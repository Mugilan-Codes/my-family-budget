import { Pool } from 'pg';

import { db_host, db_user, db_name, db_pass, db_port } from '../config';

const pool = new Pool({
  host: db_host,
  user: db_user,
  database: db_name,
  password: db_pass,
  port: db_port,
});

export default {
  query: async (text, params) => {
    return await pool.query(text, params);
  },
};

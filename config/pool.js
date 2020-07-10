import { Pool } from 'pg';

import { db_host, db_user, db_name, db_pass, db_port } from '../env';

const pool = new Pool({
  host: db_host,
  user: db_user,
  database: db_name,
  password: db_pass,
  port: db_port,
});

export { pool };

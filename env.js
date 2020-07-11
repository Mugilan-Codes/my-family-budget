import 'dotenv/config';

const port = process.env.PORT || 5000;

const db_host = process.env.PGHOST || 'localhost';
const db_user = process.env.PGUSER;
const db_name = process.env.PGDATABASE;
const db_pass = process.env.PGPASSWORD;
const db_port = process.env.PGPORT || 5432;

export { port, db_host, db_user, db_name, db_pass, db_port };

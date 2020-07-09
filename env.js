import 'dotenv/config';

const port = process.env.PORT || 5000;

const db_host = process.env.PGHOST;
const db_user = process.env.PGUSER;
const db_name = process.env.PGDATABASE;
const db_pass = process.env.PGPASSWORD;
const db_port = process.env.PGPORT;

const db_url = process.env.DATABASE_URL;

export { port, db_host, db_user, db_name, db_pass, db_port, db_url };

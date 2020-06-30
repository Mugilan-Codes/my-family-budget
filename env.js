import 'dotenv/config';

const port = process.env.PORT || 5000;
const db_url = process.env.DATABASE_URL;

export { port, db_url };

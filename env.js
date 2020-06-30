import 'dotenv/config';

export default {
  port: process.env.PORT || 5000,
  db_url: process.env.DATABASE_URL,
};

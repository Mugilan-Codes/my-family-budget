const { Pool } = require('pg');

const { db_url } = require('../env');

const databaseConfig = { connectionString: db_url };
const pool = new Pool(databaseConfig);

module.exports = pool;

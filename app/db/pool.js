import { Pool } from 'pg';

import { db_url } from '../../env';

const databaseConfig = { connectionString: db_url };

export const pool = new Pool(databaseConfig);

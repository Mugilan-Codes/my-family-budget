import { pool } from './pool';

export const query = async (quertText, params) => {
  try {
    const res = await pool.query(quertText, params);
    return res;
  } catch (err) {
    console.error(err.message);
  }
};

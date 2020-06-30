const pool = require('./pool');

/**
 * DB Query
 * @param {object} req
 * @param {object} res
 * @returns {object} object
 */
const query = async (quertText, params) => {
  try {
    const res = await pool.query(quertText, params);
    return res;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = query;

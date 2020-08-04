import db from '.';

const addEntryToDb = async ({
  id,
  user_id,
  category,
  description,
  is_income,
  amount,
  entry_date,
  created_on,
  updated_on,
}) => {
  const query = `
    INSERT INTO entries (
      id, user_id, category, description, is_income, amount, entry_date, created_on, updated_on
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    ) RETURNING *
  `;

  const { rows } = await db.query(query, [
    id,
    user_id,
    category,
    description,
    is_income,
    amount,
    entry_date,
    created_on,
    updated_on,
  ]);

  return rows[0];
};

const getAllEntriesByUser = async (id) => {
  const query = `
    SELECT * 
    FROM entries
    WHERE user_id = $1
  `;

  const { rows } = await db.query(query, [id]);

  return rows;
};

export { addEntryToDb, getAllEntriesByUser };

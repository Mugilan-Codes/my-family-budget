import { v4 as uuidv4 } from 'uuid';
import {
  addEntryToDb,
  getAllEntriesByUser,
  getOneEntryByUser,
} from '../db/entries';

const addEntryService = async ({
  user_id,
  category,
  description,
  is_income,
  amount,
  entry_date,
}) => {
  try {
    const id = uuidv4();
    const created_on = new Date();
    const updated_on = new Date();

    const result = await addEntryToDb({
      id,
      user_id,
      category,
      description,
      is_income,
      amount,
      entry_date,
      created_on,
      updated_on,
    });

    return result;
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

const getAllEntryService = async (id) => {
  try {
    const result = await getAllEntriesByUser(id);

    return result;
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

//! Return error for invalid id
const getOneEntryService = async ({ id, user_id }) => {
  try {
    const result = await getOneEntryByUser(id, user_id);

    return result;
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

export { addEntryService, getAllEntryService, getOneEntryService };

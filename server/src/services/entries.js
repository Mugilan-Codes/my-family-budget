import { v4 as uuidv4 } from 'uuid';

const addEntryService = async ({
  user_id,
  category,
  description,
  is_income,
  amount,
  entry_date,
}) => {
  try {
    console.log({
      user_id,
      category,
      description,
      is_income,
      amount,
      entry_date,
    });

    console.log(!!is_income);
    console.log(!!entry_date);

    const id = uuidv4();
    const created_on = new Date();
    const updated_on = new Date();

    console.log({
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

    // Call to DB

    return {
      id,
      user_id,
      category,
      description,
      is_income,
      amount,
      entry_date,
      created_on,
      updated_on,
    };
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

export { addEntryService };

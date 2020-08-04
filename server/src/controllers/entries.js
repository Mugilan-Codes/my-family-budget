import { addEntryService, getAllEntryService } from '../services/entries';

/*
 * @route   POST /api/entries/
 *
 * @desc    Add Entry
 *
 * @param   {string}   category
 * @param   {string}   [description=null]
 * @param   {boolean}  [is_income=false]
 * @param   {numeric}  amount
 * @param   {date}     [entry_date=today's date]
 */
const addEntryController = async (req, res, next) => {
  const { category, description, is_income, amount, entry_date } = req.body;
  const { id: user_id } = req.user;

  try {
    const addEntry = await addEntryService({
      user_id,
      category,
      description,
      is_income,
      amount,
      entry_date,
    });

    res.send(addEntry);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

/*
 * @route   GET /api/entries/
 *
 * @desc    Get All Entries by User
 */
const getAllEntriesController = async (req, res, next) => {
  const { id } = req.user;

  try {
    const getEntries = await getAllEntryService(id);

    res.send(getEntries);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

export { addEntryController, getAllEntriesController };

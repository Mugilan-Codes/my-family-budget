import {
  addEntryService,
  getAllEntryService,
  getOneEntryService,
  deleteOneEntryService,
} from '../services/entries';
import { errors } from 'celebrate';

/*
 * @route   POST /api/entries/
 * @desc    Add Entry
 * @access  Private
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
    console.log('addEntryController');
    console.error(err.message);
    next(err);
  }
};

/*
 * @route   GET /api/entries/
 * @desc    Get All Entries by User
 * @access  Private
 */
const getAllEntriesController = async (req, res, next) => {
  const { id } = req.user;

  try {
    const getEntries = await getAllEntryService(id);

    res.send(getEntries);
  } catch (err) {
    console.log('getAllEntriesController');
    console.error(err.message);
    next(err);
  }
};

/*
 * @route   GET /api/entries/:id
 * @desc    Get a single Entry
 * @access  Private
 */
const getEntryByIdController = async (req, res, next) => {
  const { id } = req.params;
  const { id: user_id } = req.user;

  try {
    const getEntry = await getOneEntryService({ id, user_id });

    if (getEntry.err_msg) {
      return res.status(404).json({ errors: [{ msg: getEntry.err_msg }] });
    }

    res.send(getEntry);
  } catch (err) {
    console.log('getEntryByIdController');
    console.error(err.message);
    next(err);
  }
};

/*
 * @route   DELETE /api/entries/:id
 * @desc    Delete a single Entry
 * @access  Private
 */
const deleteEntryByIdController = async (req, res, next) => {
  const { id } = req.params;
  const { id: user_id } = req.user;

  try {
    const deleteEntry = await deleteOneEntryService({ id, user_id });

    if (deleteEntry.err_msg) {
      return res.status(404).json({ errors: [{ msg: deleteEntry.err_msg }] });
    }

    console.log({ deleteEntry });

    res.send('Entry Deleted');
  } catch (err) {
    console.log('deleteEntryByIdController');
    console.error(err.message);
    next(err);
  }
};

export {
  addEntryController,
  getAllEntriesController,
  getEntryByIdController,
  deleteEntryByIdController,
};

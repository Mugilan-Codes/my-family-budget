const addEntryController = async (req, res, next) => {
  const { category, description, is_income, amount, entry_date } = req.body;
  const { id: user_id } = req.user;

  res.send({ user_id, category, description, is_income, amount, entry_date });
};

export { addEntryController };

import { Joi } from 'celebrate';

const registerSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(5).max(30).optional().default(null),
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string().min(5),
  password: Joi.string().required(),
}).xor('email', 'username');

const updateSchema = Joi.object({
  name: Joi.string().max(30).default(null),
  email: Joi.string().email().max(50).default(null),
  password: Joi.string().min(6).default(null),
  username: Joi.string().min(5).max(30).default(null),
}).or('name', 'email', 'password', 'username');

const deleteSchema = Joi.object({
  password: Joi.string().required(),
});

const addPostSchema = Joi.object({
  category: Joi.string().lowercase().required(),
  description: Joi.string().lowercase().default(null),
  is_income: Joi.boolean().default(false),
  amount: Joi.number().min(1).required(),
  entry_date: Joi.date().less('now').default(new Date()),
});

export {
  loginSchema,
  registerSchema,
  updateSchema,
  deleteSchema,
  addPostSchema,
};

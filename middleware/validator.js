import { validationResult } from 'express-validator';
import { status } from '../helper/status';

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(status.bad).json({ errors: errors.array() });
  };
};

export { validate };

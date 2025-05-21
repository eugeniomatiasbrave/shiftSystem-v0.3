import Joi from "joi";

// Esquema para validación de registro de usuarios
const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  role: Joi.string().valid('user', 'admin').default('user'),
  phone: Joi.string().pattern(/^\d{10}$/).optional()
});

export const userValidator = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(err => ({
      field: err.path[0],
      message: err.message
    }));
    return res.status(400).json({ status: 'error', errors });
  }
  next();
};

// Esquema para validación de login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(30).required(),
});

export const loginValidator = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(err => ({
      field: err.path[0],
      message: err.message
    }));
    return res.status(400).json({ status: 'error', errors });
  }
  next();
};

// Esquema para validación de turnos
const shiftSchema = Joi.object({
  id_user: Joi.number().optional(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  status: Joi.string()
    .valid("available", "reserved", "canceled", "completed")
    .default("available"),
  notes: Joi.string().max(500).optional()
});

export const shiftValidator = (req, res, next) => {
  const { error } = shiftSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(err => ({
      field: err.path[0],
      message: err.message
    }));
    return res.status(400).json({ status: 'error', errors });
  }
  next();
};



// Middleware genérico para validación con esquema personalizado
export const validateWithSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(err => ({
      field: err.path[0],
      message: err.message
    }));
    return res.status(400).json({ status: 'error', errors });
  }
  next();
};

const validation = (schema) => {
  const joinValidation = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorsComplete = error.details.map((err) => err.message);
      res.status(422).json({ error: errorsComplete });
    } else {
      next();
    }
  };
  return joinValidation;
};

module.exports = validation;

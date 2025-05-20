// Middleware för att validera req.body, req.params eller req.query med ett Joi-schema
export const validate = (schema, property = "body" | "params" | "query") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors });
    }
    next();
  };
};

export default validate;
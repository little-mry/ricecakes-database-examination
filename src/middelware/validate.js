import { Schema } from "joi";

export const validate = (schema, property = "body" | "params" | "query") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
    }
  };
};

import joi, { any } from "joi";

export const createUserSchema = joi.object({
  firstname: joi.string().min(1).max(20).required().messages({
    "string.base": "Firstname måste vara en sträng",
    "string-min": "Firstname måste bestå av minst {#limit} tecken",
    "string-max": "Firstname får bestå av max {#limit} tecken",
    "any.required": "Firstname saknas",
  }),
  lastname: joi.string().min(1).max(50).required().messages({
    "string.base": "Lastname måste vara en sträng",
    "string-min": "Lastname måste bestå av minst {#limit} tecken",
    "string-max": "Lastname får bestå av max {#limit} tecken",
    "any.required": "Lastname saknas",
  }),
  username: joi.string().min(3).max(30).required().messages({
    "string.base": "Username måste vara en sträng",
    "string-min": "Username måste bestå av minst {#limit} tecken",
    "string-max": "Username får bestå av max {#limit} tecken",
    "any.required": "Username saknas",
  }),
  email: joi.string().email().required().messages({
    "email.base": "Ogiltigt epost-format",
    "any.required": "Email saknas",
  }),
  password: joi.string().min(6).max(50).required().messages({
    "string.base": "Lösenordet måste vara en sträng",
    "string.min": "Lösenordet måste vara minst {#limit} tecken",
    "string.max": "Lösenordet får vara max {#limit} tecken",
    "any.required": "Lösenord saknas",
  }),
});

export const loginUserSchema = joi.object({
  username: joi.string().min(3).max(30).required().messages({
    "string.base": "Username måste vara en sträng",
    "string-min": "Username måste bestå av minst {#limit} tecken",
    "string-max": "Username får bestå av max {#limit} tecken",
    "any.required": "Username saknas",
  }),
  password: joi.string().min(6).max(50).required().messages({
    "string.base": "Lösenordet måste vara en sträng",
    "string.min": "Lösenordet måste vara minst {#limit} tecken",
    "string.max": "Lösenordet får vara max {#limit} tecken",
    "any.required": "Lösenord saknas",
  }),
});

export const userIdSchema = joi.object({
  userId: joi.number().required().messages({
    "number.base": "Id:t måste vara ett nummer",
    "any.required": "User-id saknas",
  }),
});

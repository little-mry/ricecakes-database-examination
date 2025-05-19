import joi from "joi";

export const messageIdSchema = joi.object({
  msgId: joi.number().integer().positive().required().messages({
    "number.base": "Id:t måste vara ett nummer",
    "any.required": "Message_id saknas",
  }),
});

export const messageSchema = joi.object({
  title: joi.string().min(1).max(50).required().messages({
    "string.base": "Titeln måste vara en sträng",
    "string.min": "Titeln måste vara minst {#limit} tecken",
    "string.max": "Titeln får vara max {#limit} tecken",
  }),
  content: joi.string().min(1).required().messages({
    "string.base": "Content måste vara en sträng",
    "string.min": "Content måste vara minst {#limit} tecken",
  }),
});

export const postMessageSchema = joi.object({
  title: joi.string().min(1).max(50).required().messages({
    "string.base": "Titeln måste vara en sträng",
    "string.min": "Titeln måste vara minst {#limit} tecken",
    "string.max": "Titeln får vara max {#limit} tecken",
  }),
  content: joi.string().min(1).required().messages({
    "string.base": "Content måste vara en sträng",
    "string.min": "Content måste vara minst {#limit} tecken",
  }),
});
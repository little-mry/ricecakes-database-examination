import joi from "joi";

export const addChannelSchema = joi.object({
  channel_name: joi.string().min(3).max(30).required().messages({
    "string.base": "Kanalnamn måste vara en sträng",
    "string.min": "Kanalnamn måste vara minst {#limit} tecken",
    "string.max": "Kanalnamn får vara max {#limit} tecken",
    "any.required": "Kanalnamn saknas",
  }),
});

export const channelIdSchema = joi.object({
  channelId: joi.number().integer().positive().required().messages({
    "number.base": "Id:t måste vara ett nummer",
    "any.required": "Channel_id saknas",
  }),
});



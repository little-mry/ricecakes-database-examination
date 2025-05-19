import joi from 'joi'

export const subscribeSchema = joi.object({
    channel_id: joi.number().required().messages({
        "any.required": "Channel_id saknas"
    })
}) 
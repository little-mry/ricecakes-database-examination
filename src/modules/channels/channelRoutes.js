import express from "express";
import {
  fetchAllChannels,
  addChannel,
  getChannelById,
  getMessagesInChannel,
  postMessageToChannel,
} from "./channelController.js";
import authMiddleware from "../../middelware/auth.js";
import { checkSubscription } from "../../middelware/checkSubscription.js";
import validate from '../../middelware/validate.js'
import { addChannelSchema, channelIdSchema } from "../../validation/channelValidation.js";
import { postMessageSchema } from "../../validation/messageValidation.js";

const router = express.Router();


//hämta alla kanaler
router.get("/", fetchAllChannels); 

//hämta kanal utifrån ID
router.get("/:channelId", validate(channelIdSchema, 'params'), getChannelById); 

//skapa en kanal
router.post("/", validate(addChannelSchema, 'body'), authMiddleware, addChannel); 

//hämta alla meddelanden i en specifik kanal
router.get(
  "/:channelId/messages",
  authMiddleware,
  checkSubscription,
  validate(channelIdSchema, 'params'), 
  getMessagesInChannel
);

//poata ett meddelande i en kanal
router.post(
  "/:channelId/messages",
  authMiddleware,
  checkSubscription,
  validate(channelIdSchema, 'params'), 
  validate(postMessageSchema, 'body'), 
  postMessageToChannel
);
export default router;

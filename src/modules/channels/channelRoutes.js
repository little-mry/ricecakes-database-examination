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

const router = express.Router();

//funkar
//hämta alla kanaler
router.get("/", fetchAllChannels); // GET /channels

//funkar
router.get("/:channelId", getChannelById); // GET /channels/:channelId

//funkar
router.post("/", authMiddleware, addChannel); // POST /channels

//hämta alla meddelanden i en specifik kanal
//funkar
router.get(
  "/:channelId/messages",
  authMiddleware,
  checkSubscription,
  getMessagesInChannel
);

//funkar
router.post(
  "/:channelId/messages",
  authMiddleware,
  checkSubscription,
  postMessageToChannel
);
export default router;

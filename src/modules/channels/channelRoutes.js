import express from "express";
import {
  fetchAllChannels,
  addChannel,
  getChannelById,
  getMessagesInChannel,
  postMessageToChannel,
} from "./channelController.js";

const router = express.Router();

router.get("/", fetchAllChannels); // GET /channels
router.post("/", addChannel); // POST /channels
router.get("/:channelId", getChannelById); // GET /channels/:channelId
router.get("/:channelId/messages", getMessagesInChannel); // GET /channels/:channelId/messages
router.post("/:channelId/messages", postMessageToChannel); // POST /channels/:channelId/messages

export default router;

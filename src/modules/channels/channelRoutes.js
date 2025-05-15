import express from "express";
import {
  fetchAllChannels,
  addChannel,
  getChannelById,
  getMessagesInChannel,
  postMessageToChannel,
} from "./channelController.js";
import authMiddleware from "../../middelware/auth.js";

const router = express.Router();

router.get("/", fetchAllChannels); // GET /channels
router.get("/:channelId", getChannelById); // GET /channels/:channelId

router.post("/", authMiddleware, addChannel); // POST /channels

//hur checkar vi att användaren är prenumerant på kanalen??
router.get("/:channelId/messages", authMiddleware, getMessagesInChannel); // GET /channels/:channelId/messages
//hur checkar vi att användaren är prenumerant på kanalen??
router.post("/:channelId/messages", authMiddleware, postMessageToChannel); // POST /channels/:channelId/messages


export default router;

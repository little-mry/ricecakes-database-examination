// modules/channelRoutes.js
import express from "express";
import { fetchAllChannels, addChannel } from "./channelController.js";

const router = express.Router();

router.get("/", fetchAllChannels); // GET /channels
router.post("/", addChannel); // POST /channels

//hämta detaljer om en kanal
router.get('/:channelId')

//hämta alla meddelanden i en kanal (om användaren är prenumerant)
router.get('/:channelId/messages')

//posta nytt meddelande i en kanal
router.post('/channelId/messages')



export default router;

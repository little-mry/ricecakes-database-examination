// modules/channelRoutes.js
import express from "express";
import { fetchAllChannels, addChannel } from "./channelController.js";

const router = express.Router();

router.get("/", fetchAllChannels); // GET /channels
router.post("/", addChannel); // POST /channels

export default router;

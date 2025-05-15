import { Router } from "express";
import {
  getUserSubscriptions,
  subscribeToChannel,
} from "./subscriptionController.js";

const router = Router();

// Hämta alla prenumerationer för en användare
router.get("/", getUserSubscriptions);

// Prenumerera på en kanal
router.post("/", subscribeToChannel);

export default router;

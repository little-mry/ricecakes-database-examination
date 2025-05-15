import { Router } from "express";
import {
  getUserSubscriptions,
  subscribeToChannel,
} from "./subscriptionController.js";
import authMiddleware from "../../middelware/auth.js";

const router = Router();

router.use(authMiddleware)

// Hämta alla prenumerationer för en användare
router.get("/", getUserSubscriptions);

// Prenumerera på en kanal
router.post("/", subscribeToChannel);

export default router;

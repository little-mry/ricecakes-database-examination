import { Router } from "express";
import {
  getUserSubscriptions,
  subscribeToChannel,
} from "./subscriptionController.js";
import authMiddleware from "../../middelware/auth.js";

const router = Router();

router.use(authMiddleware)

// Hämta alla prenumerationer för en användare
//funkar
router.get("/", getUserSubscriptions);

// Prenumerera på en kanal
//funkar
router.post("/", subscribeToChannel);

export default router;

import { Router } from "express";
import {
  getUserSubscriptions,
  subscribeToChannel,
} from "./subscriptionController.js";
import authMiddleware from "../../middelware/auth.js";
import validate from '../../middelware/validate.js'
import { subscribeSchema } from "../../validation/subscriptionValidation.js";

const router = Router();

router.use(authMiddleware)

// Hämta alla prenumerationer för en användare
router.get("/", getUserSubscriptions);

// Prenumerera på en kanal
router.post("/", validate(subscribeSchema, "body"), subscribeToChannel);

export default router;

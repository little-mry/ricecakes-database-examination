import { Router } from "express";
import { getMessageById, changeMessageById, deleteMessageById } from "./messageController.js";
import authMiddleware from "../../middelware/auth.js";
import validate from "../../middelware/validate.js";
import { messageIdSchema, messageSchema } from "../../validation/messageValidation.js";

const router = Router();

router.use(authMiddleware);

// Hämta ett meddelande
router.get("/:msgId", validate(messageIdSchema, "params"), getMessageById);

// Uppdatera ett meddelande
router.patch(
  "/:msgId",
  validate(messageIdSchema, "params"),
  validate(messageSchema, "body"),
  changeMessageById
);

// Radera ett meddelande
router.delete("/:msgId", validate(messageIdSchema, "params"), deleteMessageById);

export default router;

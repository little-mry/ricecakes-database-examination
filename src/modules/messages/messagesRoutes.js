import { Router } from "express";
import { getMessageById, changeMessageById, deleteMessageById } from "./messageController.js";

const router = Router();


router.get("/:msgId", getMessageById);
router.patch("/:msgId", changeMessageById);
router.delete('/:msgId', deleteMessageById)

export default router



import { Router } from "express";
import { getMessageById, changeMessageById, deleteMessageById } from "./messageController.js";
import authMiddleware from "../../middelware/auth.js";

const router = Router();

router.use(authMiddleware)

router.get("/:msgId", getMessageById);

router.patch("/:msgId", changeMessageById);
router.delete('/:msgId', deleteMessageById)

export default router



import { Router } from "express";
import { getMessageById, changeMessageById, deleteMessageById } from "./messageController.js";
import authMiddleware from "../../middelware/auth.js";

const router = Router();

router.use(authMiddleware)

//funkar
router.get("/:msgId", getMessageById);

//funkar
router.patch("/:msgId", changeMessageById);

//funkar
router.delete('/:msgId', deleteMessageById)

export default router



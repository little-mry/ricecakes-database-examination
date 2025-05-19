import { Router } from "express";
import { signUpUser, loginUser, getUserInfo } from "./userController.js";
import validate from "../../middelware/validate.js";
import {
  createUserSchema,
  loginUserSchema,
  userIdSchema,
} from "../../validation/userValidation.js";

const router = Router();

//skapa användare
router.post("/signup", validate(createUserSchema, "body"), signUpUser);

//logga in användare
router.post("/login", validate(loginUserSchema, "body"), loginUser);

//hämta user-info
router.get("/:userId", validate(userIdSchema, "params"), getUserInfo);

export default router;

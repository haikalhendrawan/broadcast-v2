import express, { Request, Response } from "express";
import {addUser, authVerify, initSession, logout} from "../controller/auth.ts";

const router = express.Router();

router.post("/login", authVerify, initSession);
router.post("/addUser", addUser);
router.get("/logout", logout);


export default router;
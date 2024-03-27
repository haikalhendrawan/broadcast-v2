import express, { Request, Response } from "express";
import {addUser, authVerify, initSession, logout, getActiveSession} from "../controller/auth.ts";

const router = express.Router();

router.post("/login", authVerify, initSession);
router.post("/addUser", addUser);
router.get("/logout", logout);
router.get("/getActiveSession", getActiveSession);


export default router;
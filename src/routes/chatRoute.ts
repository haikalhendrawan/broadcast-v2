import express, { Request, Response } from "express";
import {getChat, getChats, getContacts, sendChat} from "../controller/chat.ts";


const router = express.Router();

router.get("/getChat", getChat);
router.get("/getChats", getChats);
router.get("/getContacts/:serialized", getContacts);
router.post("/sendChat", sendChat);



export default router;
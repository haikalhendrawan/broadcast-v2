import express, { Request, Response } from "express";
import {getChat, getChats, getContacts, sendChat, sendChatWithFile} from "../controller/chat.ts";


const router = express.Router();

router.get("/getChat", getChat);
router.get("/getChats", getChats);
router.get("/getContacts/:serialized", getContacts);
router.post("/sendChat", sendChat);
router.post("/sendChatWithFile", sendChatWithFile);



export default router;
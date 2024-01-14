import express, { Request, Response } from "express";
import {getChat, getChats, getContacts} from "../controller/chat.ts";


const router = express.Router();

router.get("/getChat", getChat);
router.get("/getChats", getChats);
router.get("/getContacts/:serialized", getContacts);

router.get("/chat", (req: Request, res: Response):void => {
  res.render('chat.ejs')
});


export default router;
import express, { Request, Response } from "express";
import {addUser, initSession} from "../controller/auth.ts";

const router = express.Router();


router.get("/login", (req: Request, res: Response):void => {
  res.render("login.ejs")
});

router.post("/login", initSession, (req, res):void => {
  res.redirect(`/home`)
});


router.post("/addUser", addUser);


export default router;
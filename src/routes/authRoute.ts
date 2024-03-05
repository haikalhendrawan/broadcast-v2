import express, { Request, Response } from "express";
import {addUser} from "../controller/auth.ts";

const router = express.Router();


router.get("/login", (req: Request, res: Response):void => {
  res.render("login.ejs")
});
router.post("/addUser", addUser);


export default router;
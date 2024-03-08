import express, { Request, Response } from "express";
import {reverseAuth, authViews, authService} from "../middlewares/authenticate.ts";
import { refresh } from "../controller/auth.ts";

const router = express.Router();

// --------------------------Reverse Protected (kalau sudah login redirect)------------------------------------
router.get("/login", reverseAuth, (req: Request, res: Response):void => {
  res.render("login.ejs")
});

// ----------------------------Protected Route ------------------------------------------------------------------
router.get("/", authViews, refresh, (req: Request, res: Response):void => {
  res.render("index.ejs")
});

router.get("/home", authViews, refresh, (req: Request, res: Response):void => {
  res.render("index.ejs")
});

router.get("/chat", authViews, refresh, (req: Request, res: Response):void => {
  res.render('chat.ejs')
});

router.get("/variable/view-variable/:id", authViews, refresh, (req: Request, res: Response):void => {
  res.render("viewVariable.ejs"); 
});

router.get("/qr", authViews, refresh, (req: Request, res: Response):void => {
  res.render('qr.ejs')
});

router.get("/calendar", authViews, refresh, (req: Request, res: Response):void => {
  res.render("calendar.ejs")
});

router.get("/variable", authViews, refresh, (req: Request, res: Response):void => {
  res.render("variable.ejs")
});

router.get("/view-variable", authViews, refresh, (req: Request, res: Response):void => {
  res.render("viewVariable.ejs")
});

router.get("/schedule", authViews, refresh, (req: Request, res: Response):void => {
  res.render("schedule.ejs")
});

router.get("/new-schedule", authViews, refresh, (req: Request, res: Response):void => {
  res.render("newSchedule.ejs")
});



// ----------------------------------------------------------------------------------------
export default router
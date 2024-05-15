import express, { Request, Response } from "express";
import {reverseAuth, authViews, authService} from "../middlewares/authenticate";
import { refresh } from "../controller/auth";

const router = express.Router();

// --------------------------Reverse Protected (kalau sudah login redirect)------------------------------------
router.get("/login", reverseAuth, (req: Request, res: Response):void => {
  res.render("login.ejs")
});

// ----------------------------Protected Route ------------------------------------------------------------------
router.get("/", authViews, refresh, renderPage("index.ejs"));

router.get("/home", authViews, refresh, renderPage("index.ejs"));

router.get("/chat", authViews, refresh, renderPage("chat.ejs"));

router.get("/variable/view-variable/:id", authViews, refresh, renderPage("viewVariable.ejs"));

router.get("/qr", authViews, refresh, renderPage("qr.ejs"));

router.get("/calendar", authViews, refresh, renderPage("calendar.ejs"));

router.get("/variable", authViews, refresh, renderPage("variable.ejs"));

router.get("/view-variable", authViews, refresh, renderPage("viewVariable.ejs"));

router.get("/schedule", authViews, refresh, renderPage("schedule.ejs"));

router.get("/new-schedule", authViews, refresh, renderPage("newSchedule.ejs"));




export default router

// ----------------------------------------------------------------------------------------
function renderPage(page: string) {
  return (req: Request, res: Response) => {
    res.render(page);
  };
}
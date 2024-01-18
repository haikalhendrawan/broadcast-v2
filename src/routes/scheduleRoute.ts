import express, { Request, Response } from "express";

const router = express.Router();


router.get("/schedule", (req: Request, res: Response):void => {
  res.render("schedule.ejs")
});

router.get("/new-schedule", (req: Request, res: Response):void => {
  res.render("newSchedule.ejs")
});



export default router;
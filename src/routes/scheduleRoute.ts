import express, { Request, Response } from "express";
import { addSchedule, getSchedule, editSchedule, deleteSchedule } from "../controller/schedule.ts";

const router = express.Router();

router.post("/addSchedule", addSchedule);
router.get("/getSchedule", getSchedule);
router.post("/editSchedule", editSchedule);
router.get("/deleteSchedule/:id", deleteSchedule);


router.get("/schedule", (req: Request, res: Response):void => {
  res.render("schedule.ejs")
});

router.get("/new-schedule", (req: Request, res: Response):void => {
  res.render("newSchedule.ejs")
});



export default router;
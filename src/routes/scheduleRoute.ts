import express, { Request, Response } from "express";
import { addSchedule, getSchedule, editSchedule, editScheduleDetail, deleteSchedule } from "../controller/schedule.ts";

const router = express.Router();

router.post("/addSchedule", addSchedule);
router.get("/getSchedule", getSchedule);
router.post("/editSchedule", editSchedule);
router.post("/editScheduleDetail", editScheduleDetail);
router.get("/deleteSchedule/:id", deleteSchedule);





export default router;
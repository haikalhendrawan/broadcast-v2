import express, { Request, Response } from "express";
import {getCalendar, editCalendar, getTodayValAPI} from "../controller/calendar.ts";


const router = express.Router();

router.get("/getCalendar/:month/:year", getCalendar);
router.get("/getTodayValAPI", getTodayValAPI);
router.post("/editCalendar", editCalendar);



export default router;
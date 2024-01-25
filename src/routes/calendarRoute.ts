import express, { Request, Response } from "express";
import {getCalendar, editCalendar} from "../controller/calendar.ts";


const router = express.Router();

router.get("/getCalendar/:month/:year", getCalendar);
router.post("/editCalendar", editCalendar);



export default router;
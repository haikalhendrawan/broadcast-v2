import express, { Request, Response } from "express";
import * as weatherController from "../controller/weather";

const router = express.Router();

router.get("/getTomorrowWeather", weatherController.getTomorrow);


export default router;
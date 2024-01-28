import express, { Request, Response } from "express";
import { allJobs, compileJobs, startJobs, stopJobs} from "../controller/jobs.ts";

const router = express.Router();

router.get('/startJobs', startJobs);
router.get('/stopJobs', stopJobs);

export default router;
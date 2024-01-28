import client from "../config/client.ts";
import { Request, Response } from "express";
import {CronJob} from "cron";
import { getTodayVariable } from "./variable.ts";
import { getTodayValidation } from "./calendar.ts";
import { DUMMY } from "./message.ts";

const allJobs:CronJob[] = [];

const compileJobs = () => {
  DUMMY.map((item) => {
    const job = new CronJob(item.cron, item.function);
    allJobs.push(job)
  });
};

const startJobs = async(req:Request, res:Response) => {
  allJobs.map((item) => {
    item.start()
  });
  res.json({message:'job has been started'})
};

const stopJobs = async(req:Request, res:Response) => {
  allJobs.map((item) => {
    item.stop()
  });
  res.json({message:'job has been stoped'})
};

compileJobs();

export{allJobs, compileJobs, startJobs, stopJobs}

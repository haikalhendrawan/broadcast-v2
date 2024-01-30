import client from "../config/client.ts";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import {CronJob} from "cron";
import { kirimBroadcastPagi } from "./message.ts";
import { getActiveSchedule } from "./schedule.ts";

let allJobs:CronJob[] = [];

const compileJobs = async() => {
  const result = await getActiveSchedule();
  const activeSchedule = result as RowDataPacket;

  activeSchedule.map((item:any) => {
    const job = new CronJob(item.cron, () => {
      kirimBroadcastPagi(item.message);
    });
    allJobs.push(job)
  });
};

const removeJobs = async() => {
  allJobs = []
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

export{allJobs, compileJobs, removeJobs, startJobs, stopJobs}

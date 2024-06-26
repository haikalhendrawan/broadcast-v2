import client from "../config/client";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import {CronJob} from "cron";
import  * as messageController from "./message";
import { getActiveSchedule } from "./schedule";

let allJobs:CronJob[] = [];

const compileJobs = async() => {
  const result = await getActiveSchedule();
  const activeSchedule = result as RowDataPacket;

  activeSchedule.map((item: any) => {
    const job = new CronJob(item.cron, () => {
      messageController.sendSchedule(item.receiver_number, item.message);
    });
    allJobs.push(job)
  });
};

const removeJobs = async() => {
  allJobs = []
};

const startJobs = async(req:Request, res:Response) => {
  await removeJobs(); 
  await compileJobs(); 
  
  allJobs.map((item) => {
    item.start()
  });
  console.log("Job has been started");
  res.json({message:'job has been started'})
};

const stopJobs = async(req:Request, res:Response) => {
  allJobs.map((item) => {
    item.stop()
  });
  console.log("job has been stoped");
  res.json({message:'job has been stoped'})
};

compileJobs();

export{allJobs, compileJobs, removeJobs, startJobs, stopJobs}

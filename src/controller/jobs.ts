import client from "../config/client.ts";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import {CronJob} from "cron";
import { sendMorningSchedule, sendEveningSchedule, sendSchedule } from "./message.ts";
import { getActiveSchedule } from "./schedule.ts";

let allJobs:CronJob[] = [];

const compileJobs = async() => {
  const result = await getActiveSchedule();
  const activeSchedule = result as RowDataPacket;

  activeSchedule.map((item:any) => {
    const job = new CronJob(item.cron, () => {
      if(item.title==='Pesan Pagi'){return sendMorningSchedule(item.receiver_number, item.message)}
      if(item.title==='Pesan Sore'){return sendEveningSchedule(item.receiver_number, item.message)}
      sendSchedule(item.receiver_number, item.message);
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

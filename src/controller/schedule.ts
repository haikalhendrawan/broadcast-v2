import client from "../config/client.ts";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import cronstrue from 'cronstrue';
import 'cronstrue/locales/id.js';
import pool from "../config/db.ts"


// -----------------------------------------------------------------
const addSchedule = async(req:Request, res:Response) => {
  try{
    const title = req.body.title;
    const message = req.body.message;
    const receiverNumber = req.body.receiverNumber;
    const receiverName = req.body.receiverName;
    const cron = req.body.cron;
    const status = req.body.status;

    const q = `INSERT INTO SCHEDULE(title, message, receiver_number, receiver_name, cron, status)
               VALUES(?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(q, [title, message, receiverNumber, receiverName, cron, status]);

    return res.status(200).json({message:'Succesfully insert Data'});
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail inserting data ', isError:true})
  }
};

const editSchedule = async(req:Request, res:Response) => {
  try{
    const status = req.body.status;
    const scheduleId = req.body.scheduleId;

    const q = "UPDATE schedule SET status= ? WHERE id = ?";
    await pool.execute(q, [status, scheduleId]);

    return res.status(200).json({message:'edit data success'})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail to edit data', isError:true})
  }
};

const deleteSchedule = async(req:Request, res:Response) => {
  try{
    const scheduleId = req.params.id;
    const q = `DELETE FROM schedule WHERE id = ?`;
    await pool.execute(q, [scheduleId]);

    return res.status(200).json({message:'delete data success'})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

const getSchedule = async(req:Request, res:Response) => {
  try{
    const q = `SELECT * FROM schedule`;
    const [rows] = await pool.execute(q);
    const adjRows = rows as RowDataPacket;
    const adjRows2 = adjRows.map((item:any) => {
        item.cron_expression = cronstrue.toString(item.cron, {locale: 'id'});
      return item;
    })
    return res.status(200).json(adjRows2);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

const getActiveSchedule = async() => {
  try{
    const q = `SELECT * FROM schedule WHERE status = ?`;
    const [rows] = await pool.execute(q, [1]);

    return rows;
  }catch(err){
    console.log(err);
  }
};

const deactivateSchedule = async() => {
  try{
    const q = `UPDATE schedule SET status=? WHERE id>0`;
    await pool.execute(q, [0]);

    return console.log("schedule status has been set to 0");
  }catch(err){
    console.log(err);
  }
};



export {addSchedule, editSchedule, deleteSchedule, getSchedule, getActiveSchedule, deactivateSchedule}

// -----------------------------------------------------------------

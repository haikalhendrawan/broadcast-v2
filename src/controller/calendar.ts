import pool from "../config/db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const getCalendar = async(req:Request, res:Response) => {
  try{
    const month = req.params.month;
    const year = req.params.year;
    const q = `SELECT * FROM calendar WHERE month = ? AND year = ?`;
    const [rows] = await pool.execute(q, [month, year]);

    return res.status(200).json(rows);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

const editCalendar = async(req:Request, res:Response) => {
  try{
    const calendarId = req.body.calendarId;
    const date = req.body.date; 
    const value = req.body.value;

    const q = "UPDATE calendar SET`" + date + "`= ? WHERE id = ?";
    await pool.execute(q, [value, calendarId]);

    return res.status(200).json({message:'edit data success'})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

const getTodayValidation = async(date:string, month:number, year:number) => {
  try{
    const q = `SELECT ${pool.escapeId(date)} FROM calendar WHERE month = ? AND year = ?`;
    const [rows] = await pool.execute(q, [month, year]);
    const result = rows as RowDataPacket;
    const todayValidation = result[0][date];
    return todayValidation
  }catch(err){
    return err
  }
};

const getTodayValAPI = async(req:Request, res:Response) => {
  try{
    const today: Date = new Date();
    const date: string = today.getDate().toString();
    const month: number = today.getMonth();
    const year: number = 0;
    const q = `SELECT ${pool.escapeId(date)} FROM calendar WHERE month = ? AND year = ?`;
    const [rows] = await pool.execute(q, [month, year]);
    const result = rows as RowDataPacket;
    const todayValidation = result[0][date];
    res.status(200).json(todayValidation); // 1(true) or 0(false)
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

export {editCalendar, getCalendar, getTodayValidation, getTodayValAPI};
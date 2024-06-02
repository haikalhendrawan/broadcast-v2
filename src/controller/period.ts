import pool from "../config/db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";


const getPeriod = async(req:Request, res:Response) => {
  try{
    const q = `SELECT * FROM period`;
    const [rows] = await pool.execute(q);

    return res.status(200).json(rows);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

const addPeriod = async(req:Request, res:Response) => {
  try{
    const yearName = req.body.yearName;
    const q = `INSERT INTO year (name) VALUES (?)`;
    await pool.execute(q, [yearName]);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail adding period', isError:true})
  }
}


export {getPeriod, addPeriod}
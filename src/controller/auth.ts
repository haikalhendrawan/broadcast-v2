import pool from "../config/db.ts";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const addUser = async(req:Request, res:Response) => {
  try{
    const userId = uuidv4();
    const saltRound:number = 10;
    const {username, password, year, role} = req.body;
    const hashedPass = await bcrypt.hash(password, saltRound)
    const q = `INSERT INTO USER(user_id, username, password, year, role)
               VALUES(?, ?, ?, ?, ?)`;
    await pool.execute(q, [userId, username, hashedPass, year, role]);

    return res.status(200).json({message:'Succesfully add user'});
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail add user ', isError:true, err})
  }
}

export {addUser}
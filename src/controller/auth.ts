import pool from "../config/db.ts";
import { NextFunction, Request, Response } from "express";
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

async function initSession(req: Request , res: Response, next:NextFunction): Promise<Response | void> {
  try{
    const sessId = uuidv4();
    const userId = req.body.userId;
    const value = req.body.ip;
    const createdAt = new Date().getTime();
    const expireAt = new Date().getTime()+900000;
    const q = `INSERT INTO session(session_id, user_id, created_at, expire_at, value)
                VALUES(?, ?, ?, ?, ?)`;
    await pool.execute(q, [sessId, userId, createdAt, expireAt, value]) 
    console.log(`init`)

    res.status(200).json({msg:'login success'})
  }catch(err){
    console.log(err);
    res.status(500).json({msg:'login failed'})
  }
}


export {addUser, initSession}
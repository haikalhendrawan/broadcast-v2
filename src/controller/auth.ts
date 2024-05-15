import pool from "../config/db";
import { NextFunction, Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

interface UserRequest extends Request{
  userId:string,
  userIP:string
}

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

const authVerify = async(req:Request, res:Response, next:NextFunction): Promise<Response | void> => {
  const userReq = req as UserRequest;
  try{
    const {username, password, ip} = req.body;
    const q = `SELECT * FROM user WHERE username = ? `;
    const [rows] = await pool.query(q, [username]);
    const sqlRow = <RowDataPacket> rows;

    if(sqlRow.length===0){
      return res.status(401).json({isError:true, msg:'Invalid user'})
    };

    const hashedPassword = sqlRow[0].password;
    const isVerified = await bcrypt.compare(password, hashedPassword);

    if(!isVerified){
      return res.status(401).json({isError:true, msg:'Incorrect password'})
    };

    userReq.userId = sqlRow[0].user_id;
    userReq.userIP = ip;

    next()
  }catch(err){
    console.log(err);
    return res.status(500).json({isError:true, msg:'Database error'})
  }
}

const initSession = async(req: Request, res: Response): Promise<Response | void> => {
  const userReq = req as UserRequest;
  try{
    const sessId = uuidv4();
    const userId = userReq.userId;
    const value = userReq.userIP;
    const createdAt = new Date().getTime();
    const expireAt = createdAt + 43200000;
    const q = `INSERT INTO session(session_id, user_id, created_at, expire_at, value)
                VALUES(?, ?, ?, ?, ?)`;
    await pool.execute(q, [sessId, userId, createdAt, expireAt, value]) 

    res.cookie('session', sessId, {expires: new Date(expireAt)})
    return res.status(200).json({msg:'login success'})
  }catch(err){
    console.log(err);
    res.status(500).json({isError:true, msg:'login failed'})
  }
}

const logout = async(req:Request, res:Response) => {
  try{
    const sessionId = req.cookies.session;
    const q = "DELETE FROM session WHERE session_id = ?"
    const result = await pool.execute(q, [sessionId]);

    if(!sessionId){
      return res.status(401).json({msg:"No session has been initialized"})
    }

    res.cookie('session', "expired", {expires: new Date(0)});
    res.status(200).json({msg:"user has been logged out"})
  }catch(err){
    console.log(err);
    res.status(500).json({isError:true, msg:'login failed'})
  }
}

const refresh = async(req:Request, res:Response, next:NextFunction) => {
  try{
    const sessionId = req.cookies.session;
    const newSessId = uuidv4();
    const createdAt = new Date().getTime();
    const expireAt = createdAt + 43200000;
    const q = `UPDATE session 
                SET session_id = ? , created_at = ?, expire_at = ? 
                WHERE session_id = ?`;
    await pool.execute(q, [newSessId, createdAt, expireAt, sessionId]) 

    res.cookie('session', newSessId, {expires: new Date(expireAt)})
    console.log('current cookie id ' + newSessId)
    next()
  }catch(err){
    console.log(err);
    res.status(500).json({isError:true, msg:'refresh failed'})
  }
  
}


const getActiveSession = async(req: Request, res: Response) => {
  try{
    const q = `SELECT * FROM session`;
    const [rows] = await pool.execute(q);

    return res.status(200).json(rows)
  }catch(err){
    return res.status(500).json({isError:true, msg:err})
  }
}

export {addUser, authVerify, initSession, refresh, logout, getActiveSession}
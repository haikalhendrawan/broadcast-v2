import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.ts";
import { RowDataPacket } from "mysql2";
import express from "express";
import session from "express-session";
import passport from "passport";
import * as passportStrategy from "passport-local";
import { v4 as uuidv4 } from 'uuid';

// --------------------------------------------------------


// -----------------------------------------------------------
async function authL1(sessionId:string):Promise<Boolean|string[]>{
  const q = "SELECT FROM session WHERE session_id = ?";
  const [rows] = await pool.execute(q, [sessionId]);
  const result = rows as RowDataPacket;

  if(result.length===0){
    return false
  }

  if(result.length>0){
    const expireAt = result[0].expire_at;
    const now = new Date().getTime();
    if(now>expireAt){
      return false
    }
  }

  return result[1]
}

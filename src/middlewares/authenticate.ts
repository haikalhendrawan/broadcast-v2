import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db";
import { RowDataPacket } from "mysql2";
import express from "express";
import session from "express-session";
import { v4 as uuidv4 } from 'uuid';


interface UserRequest extends Request{
  userId:string,
  userIP:string
}

// --------------------------------------------------------
async function reverseAuth(req:Request, res:Response, next:NextFunction){
  const sessionCookie = req.cookies.session;

  if(!sessionCookie || sessionCookie.length===0){
    return next()
  }

  const q = "SELECT * FROM session WHERE session_id = ?";
  const [rows] = await pool.query(q, [sessionCookie]);
  const result = rows as RowDataPacket;

  if(result.length===0){
    return next()
  }

  if(result.length>0){
    const expireAt = result[0].expire_at;
    const now = new Date().getTime();
    if(now>expireAt){
      return next()
    }
  }

  return res.redirect("/")
}

async function authViews(req:Request, res:Response, next:NextFunction){
  const sessionCookie = req.cookies.session;
  console.log(`the current request cookie is ${req.cookies.session}`)

  if(!sessionCookie || sessionCookie.length===0){
    console.log('error no session cookie')
    return res.redirect("/login")
  }

  const q = "SELECT * FROM session WHERE session_id = ?";
  const [rows] = await pool.query(q, [sessionCookie]);
  const result = rows as RowDataPacket;

  if(result.length===0){
    console.log('error no cookie match found')
    return res.redirect("/login")
  }

  if(result.length>0){
    const expireAt = result[0].expire_at;
    const now = new Date().getTime();
    if(now>expireAt){
      console.log('cookie expired')
      return res.redirect("/login")
    }
  }

  next()

}

async function authService(req:Request, res:Response, next:NextFunction){
  const sessionCookie = req.cookies.session;

  if(!sessionCookie || sessionCookie.length===0){
    return res.status(401).json({msg:'Not authenticated'})
  }

  const q = "SELECT * FROM session WHERE session_id = ?";
  const [rows] = await pool.query(q, [sessionCookie]);
  const result = rows as RowDataPacket;

  if(result.length===0){
    return res.status(401).json({msg:'Not authenticated'})
  }

  if(result.length>0){
    const expireAt = result[0].expire_at;
    const now = new Date().getTime();
    if(now>expireAt){
      return res.status(401).json({msg:'Not authenticated'})
    }
  }

  next()

}


export {reverseAuth, authViews, authService}
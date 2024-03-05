import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.ts";
import { RowDataPacket } from "mysql2";
import express from "express";
import session from "express-session";
import passport from "passport";
import * as passportStrategy from "passport-local";

// --------------------------------------------------------


// -----------------------------------------------------------
export function initSession(req: Request ,res: Response, next: NextFunction): Response | void {
  
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction): Response | void {
  if(req.user)
    return next();
  else
    res.redirect("/login"); 
}
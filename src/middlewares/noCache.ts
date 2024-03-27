import { Express, Request, Response, NextFunction } from "express";

// this function untuk mencegah session hilang ketika browse back button. It disable caching dan instead reload new page
export default async function noCache(req:Request, res:Response, next:NextFunction){
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
}
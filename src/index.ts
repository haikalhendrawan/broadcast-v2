import express, { Request, Response } from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

// -----------------------------config--------------------
const app:any= express();

const __filename:string = fileURLToPath(import.meta.url);
const __dirname:string = path.dirname(__filename);

// ---------------------------Middlewares----------------------------
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());

app.set('views', './views')


// -------------------------------------------------------------------
app.get("/", (req: Request, res: Response):void => {
  res.json({msg:"hello"})
});

app.get("/home", (req: Request, res: Response):void => {
  res.render('index.ejs')
});


app.listen(process.env.DEV_PORT, () => {
  console.log(`listening on port ${process.env.DEV_PORT}`)
});
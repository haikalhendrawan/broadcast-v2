import express, { Request, Response } from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import pool from "./config/db.ts";
import cookieParser from "cookie-parser";

import app, {server} from "./config/app.ts";
import io from "./config/io.ts";
import client from "./config/client.ts";
import chatRoute from "./routes/chatRoute.ts";
import viewsRoute from "./routes/viewsRoute.ts";
import scheduleRoute from "./routes/scheduleRoute.ts";
import variableRoute from "./routes/variableRoute.ts";
import calendarRoute from "./routes/calendarRoute.ts";
import jobsRoute from "./routes/jobsRoute.ts";
import authRoute from "./routes/authRoute.ts";
import clientDataRoute from "./routes/clientDataRoute.ts";
import { connectEvent } from "./event/io/connectionEvent.ts";
import { deactivateSchedule } from "./controller/schedule.ts";
import noCache from "./middlewares/noCache.ts";

// -----------------------------config--------------------

const __filename:string = fileURLToPath(import.meta.url);
const __dirname:string = path.dirname(__filename);

// ---------------------------Middlewares----------------------------
app.use(express.static(path.join(__dirname,'..', 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(noCache);
app.use(viewsRoute);
app.use(authRoute);
app.use(chatRoute);
app.use(scheduleRoute);
app.use(variableRoute);
app.use(calendarRoute);
app.use(jobsRoute);
app.use(clientDataRoute);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// -------------------------------------------------------------------

deactivateSchedule(); // set seluruh cron job inactive

client.initialize().catch((err:any)=>{ // initialize whatsapp web client
  console.log(err)
}); 

io.on('connection', connectEvent); // seluruh event socket.io


// ---------------------------------------------------------
server.listen(process.env.DEV_PORT, () => {
  console.log(`listening on port ${process.env.DEV_PORT}`)
});


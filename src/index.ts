import express, { Request, Response } from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import pool from "./config/db";
import cookieParser from "cookie-parser";

import app, {server} from "./config/app";
import io from "./config/io";
import client from "./config/client";
import chatRoute from "./routes/chatRoute";
import viewsRoute from "./routes/viewsRoute";
import scheduleRoute from "./routes/scheduleRoute";
import variableRoute from "./routes/variableRoute";
import calendarRoute from "./routes/calendarRoute";
import jobsRoute from "./routes/jobsRoute";
import authRoute from "./routes/authRoute";
import clientDataRoute from "./routes/clientDataRoute";
import { connectEvent } from "./event/io/connectionEvent";
import { deactivateSchedule } from "./controller/schedule";
import noCache from "./middlewares/noCache";


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


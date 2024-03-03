import client from "../config/client.ts";
import { RowDataPacket } from "mysql2";
import { getDailyVariable } from "./variable.ts";
import { getTodayValidation } from "./calendar.ts";
import { getActiveSchedule } from "./schedule.ts";
import {unintendedMsgValidation, convertHtmlToWhatsApp, escapeHTML, replaceVariable} from "../utility/messageUtil.ts";
import { getTime } from "../utility/timeUtil.ts";


const sendMorningSchedule = async(chatId:string, msgBody:string) => {
  const [today, date, dateString, day, month, year, tomorrowDate, tomorrowDateString] = getTime();

  const rows = await getDailyVariable(tomorrowDateString, month, year);
  const isWeekDay = unintendedMsgValidation(day); // true or false
  const isActiveDay = await getTodayValidation(dateString, month, year); // 1(true) or 0(false)
  const waText = await convertHtmlToWhatsApp(msgBody);

  if(!isWeekDay){
    return console.log('Today is Weekend, no message for today') 
  }
  if(isActiveDay !== 1){
    return console.log('Today is not an Active Day, no message for today') 
  }

  try{
    console.log(waText+ "morning schedule");
    await client.sendMessage(chatId, waText);
  }catch(err){
    console.log(err);
  };
};

const sendEveningSchedule = async(chatId:string, msgBody:string) => {
  const [today, date, dateString, day, month, year, tomorrowDate, tomorrowDateString] = getTime();

  const rows = await getDailyVariable(tomorrowDateString, month, year);
  const isWeekDay = unintendedMsgValidation(day); // true or false
  const isActiveDay = await getTodayValidation(dateString, month, year); // 1(true) or 0(false)

  const morningCall = rows['Morning Call'] || null;
  const seragam = rows['Seragam'] || null ;
  const variabledText =  msgBody.replace('${seragam}', seragam).replace('${morningCall}', morningCall);
  const waText = await convertHtmlToWhatsApp(variabledText);

  if(!isWeekDay){
    return console.log('Today is Weekend, no message for today') 
  }
  if(isActiveDay !== 1){
    return console.log('Today is not an Active Day, no message for today') 
  }
  if(!morningCall || morningCall.length<1 || morningCall==='null'){
    return console.log('Invalid Morning Call Variable, no message for today') 
  }
  if(!seragam || seragam.length<1 || seragam==='null'){
    return console.log('Invalid Seragam Variable, no message for today') 
  }
  
  try{
    console.log(waText+ "evening schedule")
    await client.sendMessage(chatId, waText);
  }catch(err){
    console.log(err);
  };

};

const sendSchedule = async(chatId:string, msgBody:string) => {
  const [today, date, dateString, day, month, year, tomorrowDate, tomorrowDateString] = getTime();

  const rows = await getDailyVariable(tomorrowDateString, month, year);
  const isWeekDay = unintendedMsgValidation(day); // true or false
  const isActiveDay = await getTodayValidation(dateString, month, year); // 1(true) or 0(false)
  const waText = await convertHtmlToWhatsApp(msgBody);

  if(!isWeekDay){
    return console.log('Today is Weekend, no message for today')
  }
  if(isActiveDay !== 1){
    return console.log('Today is not an Active Day, no message for today')
  }

  try{
    console.log(waText+ "morning schedule")
    await client.sendMessage(chatId, waText);
  }catch(err){
    console.log(err);
  }

};


export {sendMorningSchedule, sendEveningSchedule, sendSchedule}


// -------------------------------------------------------------------------------------------

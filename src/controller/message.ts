import client from "../config/client";
import { RowDataPacket } from "mysql2";
import { getDailyVariable } from "./variable";
import { getTodayValidation } from "./calendar";
import { getActiveSchedule } from "./schedule";
import * as weatherController from "./weather";
import {unintendedMsgValidation, convertHtmlToWhatsApp, escapeHTML, replaceVariable} from "../utility/messageUtil";
import { getTime } from "../utility/timeUtil";


const sendMorningSchedule = async(chatId:string, msgBody:string) => {
  const {dateString, day, month, year, tomorrowDateString} = getTime();

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
  const {dateString, day, month, year, tomorrowDateString} = getTime();

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
  const { dateString, day, month, year, tomorrowDateString} = getTime();

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

const sendWeatherForecast = async(chatId:string, msgBody:string) => {
  try{
    const weatherArray = await weatherController.getTomorrow();
    const selectedTime = weatherArray.slice(1, 4);

    let waText = `<p> Prakiraan cuaca esok hari: <br></p>`;

    selectedTime.forEach((item) => {
      const emoji = weatherController.getWeatherEmoji(item.kodeCuaca);
      console.log(emoji)
      const jam = item.jamCuaca.split(" ")[1].substring(0,2);

      waText += `<p>${jam}.00 WIB - ${item.cuaca} ${emoji}</p>`
    });

    waText = await convertHtmlToWhatsApp(waText);

    await client.sendMessage(chatId, waText);
  }catch(err){
    console.log(err);
  }
};


export {sendMorningSchedule, sendEveningSchedule, sendSchedule, sendWeatherForecast}


// -------------------------------------------------------------------------------------------

import client from "../config/client.ts";
import { Request, Response } from "express";
import {CronJob} from "cron";
import sanitizeHtml from 'sanitize-html';
import emoji from "emoji-js";
import { RowDataPacket } from "mysql2";
import { getDailyVariable } from "./variable.ts";
import { getTodayValidation } from "./calendar.ts";
import { getActiveSchedule } from "./schedule.ts";

const sendMorningSchedule = async(chatId:string, msgBody:string) => {
  const today = new Date();
  const date = today.getDate();
  const dateString = date.toString();
  const day = today.getDay();
  const month = today.getMonth();
  const year = 0;
  const tomorrowDate = new Date().getDate()+1;
  const tomorrowDateString = tomorrowDate.toString();

  const rows = await getDailyVariable(tomorrowDateString, month, year);
  const isWeekDay = unintendedMsgValidation(day); // true or false
  const isActiveDay = await getTodayValidation(dateString, month, year); // 1(true) or 0(false)


  const waText = await convertHtmlToWhatsApp(msgBody);

  if(!isWeekDay){
    return console.log('Today is Weekend, no message for today') }
  if(isActiveDay !== 1){
    return console.log('Today is not an Active Day, no message for today') }

  try{
    console.log(waText+ "morning schedule")
    await client.sendMessage(chatId, waText);
  }catch(err){
    console.log(err);
  };
};

const sendEveningSchedule = async(chatId:string, msgBody:string) => {
  const today = new Date();
  const date = today.getDate();
  const dateString = date.toString();
  const day = today.getDay();
  const month = today.getMonth();
  const year = 0;
  const tomorrowDate = new Date().getDate()+1;
  const tomorrowDateString = tomorrowDate.toString();

  const rows = await getDailyVariable(tomorrowDateString, month, year);
  const isWeekDay = unintendedMsgValidation(day); // true or false
  const isActiveDay = await getTodayValidation(dateString, month, year); // 1(true) or 0(false)

  const morningCall = rows['Morning Call'] || null;
  const seragam = rows['Seragam'] || null ;

  const variabledText =  msgBody.replace('${seragam}', seragam).replace('${morningCall}', morningCall);
  const waText = await convertHtmlToWhatsApp(variabledText);

  if(!isWeekDay){
    return console.log('Today is Weekend, no message for today') }
  if(isActiveDay !== 1){
    return console.log('Today is not an Active Day, no message for today') }
  if(!morningCall || morningCall.length<1 || morningCall==='null'){
    return console.log('Invalid Morning Call Variable, no message for today') }
  if(!seragam || seragam.length<1 || seragam==='null'){
    return console.log('Invalid Seragam Variable, no message for today') }
  
  try{
    console.log(waText+ "evening schedule")
    await client.sendMessage(chatId, waText);
  }catch(err){
    console.log(err);
  };

};

const sendSchedule = async(chatId:string, msgBody:string) => {
  const today = new Date();
  const date = today.getDate();
  const dateString = date.toString();
  const day = today.getDay();
  const month = today.getMonth();
  const year = 0;
  const tomorrowDate = new Date().getDate()+1;
  const tomorrowDateString = tomorrowDate.toString();

  const rows = await getDailyVariable(tomorrowDateString, month, year);
  const isWeekDay = unintendedMsgValidation(day); // true or false
  const isActiveDay = await getTodayValidation(dateString, month, year); // 1(true) or 0(false)


  const waText = await convertHtmlToWhatsApp(msgBody);

  if(!isWeekDay){
    return console.log('Today is Weekend, no message for today'); }
  if(isActiveDay !== 1){
    return console.log('Today is not an Active Day, no message for today'); }

  try{
    console.log(waText+ "morning schedule")
    await client.sendMessage(chatId, waText);
  }catch(err){
    console.log(err);
  }

};


export {sendMorningSchedule, sendEveningSchedule, sendSchedule}


// -------------------------------------------------------------------------------------------
function unintendedMsgValidation (day:number) {
  let isValid = true;
  if(day===0 || day===6){isValid = false}
  return isValid
};

async function convertHtmlToWhatsApp(html:string) {
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: ['b', 'strong', 'i', 'em', 'u', 's', 'strike', 'br', 'p'],
    allowedAttributes: {},
  });

  const paragraphRegex = /<p\b[^>]*>(.*?)<\/p>/gis;
  const paragraphReplace = '$1\n';
  const message = cleanHtml.replace(paragraphRegex, paragraphReplace);

  const brRegex = /<br\s*\/?>/gi;
  const brReplace = '\n';
  const brMessage = message.replace(brRegex, brReplace);

  const emojiConverter = new emoji();
  const emojiRegex = /<img.*?data-emoji="([^\s"]+)".*?>/gi;
  const emojiReplace = (match:any, p1:any) => {
    const emojiUnicode = emojiConverter.replace_colons(`:${p1}:`);
    return emojiUnicode ? escapeHTML(emojiUnicode) : '';
  };
  const emojiMessage = brMessage.replace(emojiRegex, emojiReplace);

  const boldRegex = /<b\b[^>]*>(.*?)<\/b>/gi;
  const boldReplace = '*$1*';
  const boldMessage = emojiMessage.replace(boldRegex, boldReplace);

  const italicRegex = /<i\b[^>]*>(.*?)<\/i>/gi;
  const italicReplace = '_$1_';
  const italicMessage = boldMessage.replace(italicRegex, italicReplace);

  const strikeRegex = /<strike\b[^>]*>(.*?)<\/strike>/gi;
  const strikeReplace = '~$1~';
  const strikeMessage = italicMessage.replace(strikeRegex, strikeReplace);

  return strikeMessage;
}

function escapeHTML(text:any) {
  const replacements = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
  };
  return text.replace(/[<>&"'\/]/g, (match: keyof typeof replacements) => replacements[match]);
};

function replaceVariable(text:string, stringToReplace:string, varThatReplace:any){
  const textToReturn = text.replace(stringToReplace, varThatReplace);
  return textToReturn
};

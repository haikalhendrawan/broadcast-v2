import client from "../config/client.ts";
import { Request, Response } from "express";
import {CronJob} from "cron";
import { getTodayVariable } from "./variable.ts";
import { getTodayValidation } from "./calendar.ts";
import sanitizeHtml from 'sanitize-html';
import emoji from "emoji-js";

const sendMorningMessage = async() => {
  const today = new Date();
  const date = today.getDate();
  const dateString = date.toString();
  const day = today.getDay();
  const month = today.getMonth();
  const year = 0;

  const rows = await getTodayVariable(dateString, month, year);
  const isWeekDay = unintendedMsgValidation(day); // true or false
  const isActiveDay = await getTodayValidation(dateString, month, year); // 1(true) or 0(false)
  const morningCall = rows['Morning Call'];
  const seragam = rows['Seragam'];

  // if(!isWeekDay){
  //   return console.log('Today is Weekend, no message for today'); }
  if(isActiveDay !== 1){
    return console.log('Today is not an Active Day, no message for today'); }
  if(!morningCall || morningCall.length<1 || morningCall==='null'){
    return console.log('Invalid Morning Call Variable, no message for today'); }
  if(!seragam || seragam.length<1 || seragam==='null'){
    return console.log('Invalid Seragam Variable, no message for today'); }
  
  console.log(
    `Selamat Pagi Bapak Ibu jangan lupa untuk absen ya
    Informasi untuk besok:
    -UIC Morning Call = ${morningCall}
    -Seragam = ${seragam}

    Terimakasih selamat beristirahat bapak/ibu
    `
    )

  
};

const DUMMY = [
  {
    cron:'* * * * *',
    function: () => {sendMorningMessage()}
  },
  {
    cron:'* * * * *',
    function: () => {console.log("dummy msg 2")}
  },
]


export {DUMMY}


// -------------------------------------------------------------------------------------------
function unintendedMsgValidation (day:number) {
  let isValid = true;
  if(day===0 || day===6){isValid = false}
  return isValid
};

function convertHtmlToWhatsApp(html:any) {
  // Remove any unwanted tags or attributes from the HTML
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: ['b', 'strong', 'i', 'em', 'u', 's', 'strike', 'br', 'p'],
    allowedAttributes: {},
  });

  const message = cleanHtml.replace(/<br\s*\/?>/gi, '\n');

  const paragraphRegex = /<p\b[^>]*>(.*?)<\/p>/gi;
  const paragraphReplace = '$1\n';
  const paragraphMessage = message.replace(paragraphRegex, paragraphReplace);

  const emojiConverter = new emoji();
  const emojiRegex = /<img.*?data-emoji="([^\s"]+)".*?>/gi;
  const emojiReplace = (match:any, p1:any) => {
    const emojiUnicode = emojiConverter.replace_colons(`:${p1}:`);
    return emojiUnicode ? escapeHTML(emojiUnicode) : '';
  };
  const emojiMessage = paragraphMessage.replace(emojiRegex, emojiReplace);

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
};

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

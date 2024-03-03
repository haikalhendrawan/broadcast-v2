import client from "../config/client.ts";
import { Request, Response } from "express";
import {unintendedMsgValidation, convertHtmlToWhatsApp, escapeHTML, replaceVariable} from "../utility/messageUtil.ts";


const getChat = async(req: Request, res: Response) => {
  try{
    const chats = await client.getChats();

    const data = [];

    for (const item of chats) {
      const contactName = item.name || null;
      let contactProfilePicture = null;

      if(item.id._serialized.length>7){
        contactProfilePicture = await client.getProfilePicUrl(item.id._serialized);
      }

      // const contact = await client.getContactById(item.id._serialized);
      const contactNumber = item.id.user || null;
      const contactSerial = item.id._serialized|| null;

      const lastMessage = item.lastMessage?.body || null;
      const lastMessageTime = item.lastMessage?.timestamp || null;
      const lastMessageType = item.lastMessage?.type || null;
      const fromMe = item.lastMessage?.fromMe || null;
      const messageAck = item.lastMessage?.ack || null;

      data.push({
        contactName,
        contactProfilePicture,
        contactNumber,
        contactSerial,
        lastMessage,
        lastMessageTime,
        lastMessageType,
        fromMe,
        messageAck,
      });
    }


    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json({isError:true, errorMessage:err})
  }

};

const getChats = async(req: Request, res: Response) => {

    const chats = await client.getChats();

    res.json(chats)
};

const getContacts = async(req: Request, res: Response) => {
  
  const contact = await client.getContactById(req.params.serialized);

  const pp = await contact.getProfilePicUrl();

  res.json({contact, pp})
};

const sendChat = async(req: Request, res: Response) => {
  try{
    const waText = await convertHtmlToWhatsApp(req.body.msg);
    const number = req.body.number;

    if(!waText || !number){
      console.log('invalid msg or number')
      return res.status(500).json({msg:"error sending msg", isError:true})
    }

    await client.sendMessage(number, waText);

    return res.status(200).json({msg:"msg sent"})
  }catch(err){
    console.log(err);
    return res.status(500).json({isError:true, errorMessage:err});
  }
}

export {getChat, getChats, getContacts, sendChat};
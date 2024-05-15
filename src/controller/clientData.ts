import client from "../config/client";
import { Request, Response } from "express";


const getContacts = async(req: Request, res: Response) => {
  try{
    const contacts = await client.getContacts();
    let allContactInfo = [];

    for(const contact of contacts){
      const serial = contact.id._serialized;
      const profilePic = contact.id.server==="c.us" || contact.id.server==="g.us"
                          ?serial.length>7
                            ?await client.getProfilePicUrl(serial)
                            :null
                          :null
      allContactInfo.push({...contact, profilePic});
    };
    
    return res.status(200).json(allContactInfo)

  }catch(err){
    console.log(err);
  }
};


const getInfo = async(req: Request, res: Response) => {
  try{
    const info = client.info;
    const batteryStatus = await info.getBatteryStatus();
    
    return res.status(200).json({...info, batteryStatus})

  }catch(err){
    console.log(err);
  }
};

export{getContacts, getInfo};
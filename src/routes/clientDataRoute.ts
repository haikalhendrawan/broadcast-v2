import express, { Request, Response } from "express";
import {getContacts, getInfo} from "../controller/clientData";

const router = express.Router();

router.get("/getContact", getContacts);
router.get("/getInfo", getInfo);

export default router
import express, { Request, Response } from "express";
import {addVariable, getVariable, deleteVariable, editVariable, getAllVariable, getDailyVariable} from "../controller/variable.ts";


const router = express.Router();

router.post("/addVariable", addVariable);
router.get("/getVariable/:id/:month/:year", getVariable);
router.get("/deleteVariable/:id", deleteVariable);
router.post("/editVariable", editVariable);


router.get("/getAllVariable", getAllVariable);



export default router;
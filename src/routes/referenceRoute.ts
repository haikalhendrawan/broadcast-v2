import express, { Request, Response } from "express";

const router = express.Router();


router.get("/calendar", (req: Request, res: Response):void => {
  res.render("calendar.ejs")
});

router.get("/variable", (req: Request, res: Response):void => {
  res.render("variable.ejs")
});

router.get("/view-variable", (req: Request, res: Response):void => {
  res.render("viewVariable.ejs")
});



export default router;
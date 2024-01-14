import express, { Request, Response } from "express";

const router = express.Router();


router.get("/home", (req: Request, res: Response):void => {
  res.render("index.ejs")
});

router.get("/", (req: Request, res: Response):void => {
  res.render("index.ejs")
});


export default router;
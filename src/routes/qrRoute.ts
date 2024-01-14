import express, { Request, Response } from "express";

const router = express.Router();


router.get("/qr", (req: Request, res: Response):void => {
  res.render('qr.ejs')
});

export default router;
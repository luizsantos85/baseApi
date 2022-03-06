import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { send } from '../helpers/EmailHelper';

dotenv.config();

export const sendMail = async (req: Request, res: Response) => {
   let email: string = req.body.email as string;
   let subject: string = req.body.subject as string;
   let content: string = req.body.content as string;

   send({
      to: process.env.SMTP_EMAIL as string,
      replyTo: email,
      subject,
      html: content,
      text: content,
   });

   res.status(200).json({ success: true });
};

import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { send } from '../helpers/EmailHelper';

dotenv.config();

type ContentMail = {
   email: string;
   subject: string;
   content: string;
};

export const sendMail = async (req: Request, res: Response) => {
   let { email, subject, content }: ContentMail = req.body;

   if (!email || !subject || !content) {
      return res.status(400).json({ error: 'Preencha todos os campos!' });
   }

   send({
      to: process.env.SMTP_EMAIL as string,
      replyTo: email,
      subject,
      html: content,
      text: content,
   });

   return res.status(200).json({ success: true });
};

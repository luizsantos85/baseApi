import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport(
   {
      host: process.env.SMTP_HOST,
      port: 465,
      secure:true,
      auth: {
         user: process.env.SMTP_EMAIL,
         pass: process.env.SMTP_PASS,
      },
   },
   {
      from: `${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>`,
   }
);

type Option = {
   to?: string;
   replyTo: string;
   subject: string;
   html: string;
   text: string;
};

export const send = async (options: Option) => {
   await transport.sendMail(options);
};

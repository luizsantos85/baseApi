import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport(
   {
      host: process.env.SMTP_HOST,
      port: 465,
      auth: {
         user: process.env.SMTP_EMAIL,
         pass: process.env.SMTP_PASS,
      },
   },
   {
      from: `${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>`,
   }
);

export const send = async (options: any) => {
   await transport.sendMail(options);
};

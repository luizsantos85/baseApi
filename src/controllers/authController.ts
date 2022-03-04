import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
   if (req.body.email && req.body.password) {
      let { email, password } = req.body;
      let hasUser = await User.findOne({ where: { email } });

      if (!hasUser) {
         let passwordHash = bcrypt.hashSync(password, 10);

         let newUser = await User.create({ email, password: passwordHash });

         const token = JWT.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '2h' }
         );

         res.status(201).json({ id: newUser.id, token });
         return;
      } else {
         res.json({ error: 'E-mail já cadastrado!' });
         return;
      }
   }

   res.json({ error: 'E-mail e/ou senha inválidos!' });
   return;
};

export const login = async (req: Request, res: Response) => {
   if (req.body.email && req.body.password) {
      let email: string = req.body.email;
      let password: string = req.body.password;

      let user = await User.findOne({ where: { email } });

      if (user) {
         const match = bcrypt.compareSync(password, user.password);

         if (!match) {
            res.status(403).json({ error: 'E-mail e/ou senha inválidos.' });
            return;
         }

         const token = JWT.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '2h' }
         );
         
         res.json({ status: true, token });
         return;
      }
   }
   res.json({ status: false });
   return;
};

export const list = async (req: Request, res: Response) => {
   let users = await User.findAll();
   let list: string[] = [];

   for (let i in users) {
      list.push(users[i].email);
   }

   res.status(200).json({ list });
};

import { Request, Response } from 'express';

import {Phrase} from '../models/Phrase';

export const ping = (req: Request, res: Response) => {
   res.status(200).json({ pong: true });
};

export const random = (req: Request, res: Response) => {
   let num: number = Math.floor(Math.random() * 300);
   res.status(200).json({ numero: num });
};

export const name = (req: Request, res: Response) => {
   let nome: string = req.params.nome;
   res.status(200).json({ welcome: `Bem vindo ao sistema ${nome}` });
};


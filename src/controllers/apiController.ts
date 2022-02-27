import { Request, Response } from 'express';
import sharp from 'sharp';
import { unlink } from 'fs/promises';

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

export const uploadFile = async (req: Request, res: Response) => {
   if (req.file) {
      const fileName = req.file.filename;

      await sharp(req.file.path)
         .resize(400)
         .toFormat('jpeg')
         .toFile(`./public/assets/media/${fileName}`);

      await unlink(req.file.path);

      res.status(201).json({ fileName });
   } else {
      res.status(400).json({ error: 'Selecione um arquivo válido' });
   }
};

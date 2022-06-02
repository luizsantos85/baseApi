import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { Phrase } from '../models/Phrase';

type Body = {
   author: string;
   txt: string;
}

export const listPhrases = async (req: Request, res: Response) => {
   let phrases = await Phrase.findAll();
   return res.status(200).json(phrases);
};

export const showPhrase = async (req: Request, res: Response) => {
   let id: string = req.params.id as string;
   let phrase = await Phrase.findOne({ where: { id } });

   if (!phrase) {
      return res.status(404).json({ error: 'Id não encontrado!' });
   }

   return res.status(200).json(phrase);
};

export const createPhrase = async (req: Request, res: Response) => {
   let { author, txt }: Body = req.body;
   let newPhrase = await Phrase.create({ author, txt });
   return res.status(201).json(newPhrase);
};

export const updatePhrase = async (req: Request, res: Response) => {
   let id: string = req.params.id as string;
   let { author, txt }: Body = req.body;
   let phrase = await Phrase.findByPk(id);

   if (!phrase) {
      return res.status(404).json({ error: 'Id não encontrado!' });
   }
   
   phrase.author = author;
   phrase.txt = txt;
   await phrase.save();

   return res.status(201).json(phrase);
};

export const deletePhrase = async (req: Request, res: Response) => {
   let id: string = req.params.id as string;
   await Phrase.destroy({ where: { id } });
   return res.status(200).json({});
};

export const randomPhrase = async (req: Request, res: Response) => {
   let phrase = await Phrase.findOne({
      order: [Sequelize.fn('RAND')],
   });

   if (!phrase) {
      return res.status(404).json({ error: 'Nenhuma frase cadastrada!' });
   }

   return res.status(200).json(phrase);
};

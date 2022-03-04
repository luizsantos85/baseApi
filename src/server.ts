import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes';

import { errorHandler } from './helpers/configImage';

dotenv.config();

const server = express();
server.use(
   cors({
      origin: '*',
   })
);

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


//rotas
server.use('/api', apiRoutes);
server.use((req: Request, res: Response) => {
   res.status(404).json({ error: 'Endpoint não encontrado!' });
});

//Erro servidor imagem
server.use(errorHandler);

server.listen(process.env.PORT);

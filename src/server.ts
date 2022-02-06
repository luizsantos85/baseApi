import express, {Request,Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes'

dotenv.config();

const server = express();
server.use(cors({
    origin: '*'
}));

server.use(express.static(path.join(__dirname,'../public')));
server.use(express.urlencoded({extended:true}));

//rotas
server.use('/api',apiRoutes);
server.use((req: Request, res: Response)=>{
    res.status(404).json({error:'Endpoint não encontrado!'});
});

server.listen(process.env.PORT);


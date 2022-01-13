import { Router } from 'express';
import * as apiController from '../controllers/apiController';

const router = Router();

//rotas de teste
router.get('/ping', apiController.ping);
router.get('/num-rand', apiController.random);
router.get('/nome-teste/:nome', apiController.name);



export default router;

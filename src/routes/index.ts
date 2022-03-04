import { Router } from 'express';
import * as ApiController from '../controllers/apiController';
import * as PhrasesController from '../controllers/phrasesController';
import * as AuthController from '../controllers/authController';
import { upload } from '../helpers/configImage';
import {Auth} from '../middlewares/auth';

const router = Router();

//rotas de teste
router.get('/ping', ApiController.ping);
router.get('/num-rand', ApiController.random);
router.get('/nome-teste/:nome', ApiController.name);

//rotas de frases
router.get('/frases', PhrasesController.listPhrases);
router.get('/frase/aleatoria', PhrasesController.randomPhrase);
router.post('/frase/add', PhrasesController.createPhrase);
router.get('/frase/:id', PhrasesController.showPhrase);
router.put('/frase/:id', PhrasesController.updatePhrase);
router.delete('/frase/:id', PhrasesController.deletePhrase);

//rota teste de uploads
router.post('/upload', upload.single('avatar'), ApiController.uploadFile);

//rotas auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/list', Auth.private, AuthController.list);

export default router;

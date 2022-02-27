import { Router } from 'express';
import * as ApiController from '../controllers/apiController';
import * as phrasesController from '../controllers/phrasesController';
import { upload } from '../helpers/configImage';

const router = Router();

//rotas de teste
router.get('/ping', ApiController.ping);
router.get('/num-rand', ApiController.random);
router.get('/nome-teste/:nome', ApiController.name);

//rotas de frases
router.get('/frases', phrasesController.listPhrases);
router.get('/frase/aleatoria', phrasesController.randomPhrase);
router.post('/frase/add', phrasesController.createPhrase);
router.get('/frase/:id', phrasesController.showPhrase);
router.put('/frase/:id', phrasesController.updatePhrase);
router.delete('/frase/:id', phrasesController.deletePhrase);

//rotas de uploads
router.post('/upload', upload.single('avatar'), ApiController.uploadFile);

export default router;

import { Router } from 'express';
import * as apiController from '../controllers/apiController';
import * as phrasesController from '../controllers/phrasesController';

const router = Router();

//rotas de teste
router.get('/ping', apiController.ping);
router.get('/num-rand', apiController.random);
router.get('/nome-teste/:nome', apiController.name);

router.get('/frases', phrasesController.listPhrases);
router.get('/frase/aleatoria', phrasesController.randomPhrase);
router.post('/frase/add', phrasesController.createPhrase);
router.get('/frase/:id', phrasesController.showPhrase);
router.put('/frase/:id', phrasesController.updatePhrase);
router.delete('/frase/:id', phrasesController.deletePhrase);




export default router;

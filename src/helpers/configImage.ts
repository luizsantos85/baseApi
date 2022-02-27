import { Request, Response, ErrorRequestHandler } from 'express';
import multer, { MulterError } from 'multer';

//Erro servidor imagem
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
   res.status(400);

   if (err instanceof MulterError) {
      res.json({ error: err.code });
   } else {
      console.log(err);
      res.json({ error: 'Ops, ocorreu algum erro.' });
   }
};

const storageConfig = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './tmp');
   },
   filename: (req, file, cb) => {
      let fileName = Math.floor(Math.random() * Date.now() * 99999);
      cb(null, `${fileName}.jpg`);
   },
});

export const upload = multer({
   storage: storageConfig,
   fileFilter: (req, file, cb) => {
      const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
      cb(null, allowed.includes(file.mimetype));
   },
   limits: { fieldSize: 100000 },
});
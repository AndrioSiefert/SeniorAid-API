import { AppDataSource } from '../config/dataSource';
import express from 'express';
import multer from 'multer';
import uploadConfig from '../common/multer';
import UserRepository from '../repository/UserRepository';
import UserController from '../controllers/UserController';
import fs from 'fs'; // Importando o módulo fs
import path from 'path'; // Importando o módulo path

const router = express.Router();
const upload = multer(uploadConfig);

const userRepository = new UserRepository(AppDataSource);

const controllers = new UserController(userRepository);

router.post('/user', upload.single('photo'), (req, res) => controllers.createUser(req, res));
router.get('/user', (req, res) => controllers.getAll(req, res));
router.get('/user/:id', (req, res) => controllers.getById(req, res));
router.post('/user/login', (req, res) => controllers.login(req, res));
router.put('/user/:id', (req, res) => controllers.update(req, res));
router.delete('/user/:id', (req, res) => controllers.delete(req, res));

router.get('/images', (req, res) => {
    fs.readdir(path.join(__dirname, '..', '..', 'public/images'), (err, files) => {
        if (err) {
            return res.status(500).send('Erro ao ler diretório');
        }
        res.json(files); // Retorna a lista de arquivos no diretório
    });
});

export default router;

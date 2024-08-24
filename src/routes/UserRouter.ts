import { AppDataSource } from '../config/dataSource';
import express from 'express';
import UserRepository from '../repository/UserRepository';
import UserController from '../controllers/UserController';

const router = express.Router();

const user = new UserRepository(
    AppDataSource.getRepository('UserEntity'),
    AppDataSource
);

const controllers = new UserController(user);

router.get('/user', (req, res) => controllers.getAll(req, res));
router.get('/user/:id', (req, res) => controllers.getById(req, res));
router.post('/user', (req, res) => controllers.createUser(req, res));
router.post('/user/login', (req, res) => controllers.login(req, res));
router.put('/user/:id', (req, res) => controllers.update(req, res));
router.delete('/user/:id', (req, res) => controllers.delete(req, res));

export default router;

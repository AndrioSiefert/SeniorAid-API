import express from 'express';
import { AppDataSource } from '../config/dataSource';
import SeniorRepository from '../repository/SeniorRepository';
import SeniorController from '../controllers/SeniorController';

const router = express.Router();

const genericRepository = new SeniorRepository(
    AppDataSource.getRepository('SeniorEntity')
);

const controllers = new SeniorController(genericRepository);

router.get('/senior', (req, res) => controllers.getAll(req, res));
router.get('/senior/:id', (req, res) => controllers.getById(req, res));
// router.post('/senior', (req, res) => controllers.createUser(req, res));
// router.post('/senior/login', (req, res) => controllers.login(req, res));
router.put('/senior/:id', (req, res) => controllers.update(req, res));
router.delete('/senior/:id', (req, res) => controllers.delete(req, res));

export default router;

import express from 'express';
import { AppDataSource } from '../config/dataSource';
import SeniorServiceRepository from '../repository/SeniorServiceRepository';
import SeniorServiceController from '../controllers/SeniorServiceController';

const router = express.Router();

const seniorServiceRepository = new SeniorServiceRepository(AppDataSource.getRepository('SeniorServiceEntity'));

const controllers = new SeniorServiceController(seniorServiceRepository);

router.get('/seniorService', (req, res) => controllers.getAll(req, res));
router.get('/seniorService/info', (req, res) => controllers.ServiceAndSeniorInfoGlobal(req, res));
router.get('/seniorService/:id', (req, res) => controllers.getById(req, res));
router.get('/seniorService/id/:id', (req, res) => controllers.findForInfo(req, res));
router.post('/seniorService', (req, res) => controllers.create(req, res));
router.put('/seniorService/:id', (req, res) => controllers.update(req, res));
router.delete('/seniorService/:id', (req, res) => controllers.delete(req, res));

export default router;

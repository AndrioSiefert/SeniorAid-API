import express from 'express';
import { AppDataSource } from '../config/dataSource';
import CaregiverServiceRepository from '../repository/CaregiverServiceRepository';
import CaregiverServiceController from '../controllers/CaregiverServiceController';

const router = express.Router();

const caregiverServiceRepository = new CaregiverServiceRepository(
    AppDataSource.getRepository('CaregiverServiceEntity')
);

const controllers = new CaregiverServiceController(caregiverServiceRepository);

router.get('/caregiver-service', (req, res) => controllers.getAll(req, res));
router.get('/caregiver-service/id/:id', (req, res) =>
    controllers.getById(req, res)
);
router.get('/caregiver-service/:id', (req, res) =>
    controllers.getInfoService(req, res)
);
router.post('/caregiver-service', (req, res) => controllers.create(req, res));
router.put('/caregiver-service', (req, res) => controllers.update(req, res));
router.delete('/caregiver-service/:id', (req, res) =>
    controllers.delete(req, res)
);

export default router;

import express from 'express';
import { AppDataSource } from '../config/dataSource.js';
import CaregiverRepository from '../repository/CaregiverRepository.js';
import CaregiverController from '../controllers/CaregiverController.js';

const router = express.Router();

const caregiverRepository = new CaregiverRepository(
    AppDataSource.getRepository('CaregiverEntity')
);

const controllers = new CaregiverController(caregiverRepository);

router.get('/caregiver', (req, res) => controllers.getAll(req, res));
router.get('/caregiver/:id', (req, res) => controllers.getById(req, res));
router.post('/caregiver', (req, res) => controllers.createUser(req, res));
router.post('/caregiver/login', (req, res) => controllers.login(req, res));
router.put('/caregiver/:id', (req, res) => controllers.update(req, res));
router.delete('/caregiver/:id', (req, res) => controllers.delete(req, res));

export default router;

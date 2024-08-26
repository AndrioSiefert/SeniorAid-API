import express from 'express';
import { AppDataSource } from '../config/dataSource';
import ServiceRequestRepository from '../repository/ServiceRequestRepository';
import ServiceRequestController from '../controllers/ServiceRequestController';

const router = express.Router();
const serviceRequestRepository = new ServiceRequestRepository(
    AppDataSource.getRepository('ServiceRequestEntity')
);
const controllers = new ServiceRequestController(serviceRequestRepository);

// router.get('/service-request', (req, res) => controllers.getAll(req, res));
router.get('/service-request', (req, res) =>
    controllers.getAllRequest(req, res)
);
router.get('/service-request/:id', (req, res) => controllers.getById(req, res));
router.post('/service-request', (req, res) => controllers.create(req, res));
router.put('/service-request/accept/:id', (req, res) =>
    controllers.acceptServiceRequest(req, res)
);
router.delete('/service-request/:id', (req, res) =>
    controllers.delete(req, res)
);

export default router;

import express from 'express';
import { AppDataSource } from '../config/dataSource';
import ServiceRequestRepository from '../repository/ServiceRequestRepository';
import GenericRepository from '../repository/GenericRepository';
import ServiceRequestController from '../controllers/ServiceRequestController';

const router = express.Router();

const serviceRequestRepository = new ServiceRequestRepository(
    AppDataSource.getRepository('ServiceRequestEntity')
);

const controllers = new ServiceRequestController(serviceRequestRepository);

router.get('/service-request', (req, res) => controllers.getAll(req, res));
router.get('/service-request/all', (req, res) =>
    controllers.getAllServiceRequests(req, res)
);
router.get('/service-request/:id', (req, res) => controllers.getById(req, res));
router.get('/service-request/details/:id', (req, res) =>
    controllers.getServiceRequestDetails(req, res)
);

router.post('/service-request', (req, res) =>
    controllers.createRequest(req, res)
);
// router.put('/service-request/:id', (req, res) => controllers.update(req, res)); // esse da conflito com o de baixo
router.put('/service-request/accept/:id', (req, res) =>
    controllers.acceptServiceRequest(req, res)
);
router.delete('/service-request/:id', (req, res) =>
    controllers.delete(req, res)
);

export default router;

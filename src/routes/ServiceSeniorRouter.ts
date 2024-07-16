import express from 'express';
import { AppDataSource } from '../config/dataSource';
import SeniorControllerService from '../controllers/SeniorController-Service';
import SeniorServiceRepository from '../repository/Senior-Service-Repository';

const router = express.Router();

const seniorServiceRepository = new SeniorServiceRepository(
    AppDataSource.getRepository('SeniorServiceEntity')
);

const controllers = new SeniorControllerService(seniorServiceRepository);

router.get('/seniorService', (req, res) => controllers.getService(req, res));
router.get('/seniorService/id/:id', (req, res) =>
    controllers.getById(req, res)
);
router.get('/seniorService/senior/:seniorId', (req, res) =>
    controllers.getBySeniorId(req, res)
);
router.get('/seniorService/:id', (req, res) => controllers.get(req, res));
router.post('/seniorService', (req, res) => controllers.create(req, res));
router.put('/seniorService/:id', (req, res) => controllers.update(req, res));
router.delete('/seniorService/:id', (req, res) => controllers.delete(req, res));

export default router;

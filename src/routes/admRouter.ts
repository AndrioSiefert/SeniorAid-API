// import express from 'express';
// import { AppDataSource } from '../config/dataSource.js';
// import AdmRepository from '../repository/AdmRepository.js';
// import GenericRepository from '../repository/GenericRepository.js';
// import AdmController from '../controllers/admController.js';

// const router = express.Router();
// const admRepository = new AdmRepository(
//     AppDataSource.getRepository('AdmEntity')
// );

// const genericRepository = new GenericRepository<AdmRepository>(
//     AppDataSource.getRepository('AdmEntity')
// );

// const admController = new AdmController(genericRepository, admRepository);

// router.get('/adm', (req, res) => admController.getAll(req, res));
// router.get('/adm/:id', (req, res) => admController.getById(req, res));
// router.post('/adm/create', (req, res) => admController.create(req, res));
// router.put('/adm/:id', (req, res) => admController.update(req, res));
// router.delete('/adm/:id', (req, res) => admController.delete(req, res));
// router.post('/adm/login', (req, res) => admController.createLogin(req, res)); // Rota para criar login

// export default router;

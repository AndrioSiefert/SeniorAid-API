import express from 'express';
import FeedbackController from '../controllers/FeedbackController';
import { AppDataSource } from '../config/dataSource';
import FeedbackRepository from '../repository/FeedbackRepository';

const router = express.Router();
const feedbackRepository = new FeedbackRepository(
    AppDataSource.getRepository('FeedbackEntity')
);

const feedbackController = new FeedbackController(feedbackRepository);

router.get('/feedback', (req, res) => feedbackController.getAll(req, res));
router.get('/feedback/id/:id', (req, res) =>
    feedbackController.getById(req, res)
);
router.post('/feedback', (req, res) => feedbackController.create(req, res));
router.put('/feedback', (req, res) => feedbackController.update(req, res));
router.delete('/feedback/:id', (req, res) =>
    feedbackController.delete(req, res)
);

export default router;

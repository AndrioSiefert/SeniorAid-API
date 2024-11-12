import express from 'express';
import caregiverRouter from './caregiverRouter';
import caregiverServiceRouter from './caregiverServiceRouter';
import seniorRouter from './seniorRouter';
import serviceRequestRouter from './serviceRequestRouter';
import userRouter from './UserRouter';
import path from 'path';
import feedbackRouter from './FeedbackRouter';
import seniorServiceRouter from './SeniorServiceRouter';

const router = (app: express.Router) => {
    app.use('/images', express.static(path.join(__dirname, '..', '..', 'public/images')));
    app.use(caregiverRouter);
    app.use(caregiverServiceRouter);
    app.use(feedbackRouter);
    app.use(seniorRouter);
    app.use(seniorServiceRouter);
    app.use(serviceRequestRouter);
    app.use(userRouter);
};

export default router;

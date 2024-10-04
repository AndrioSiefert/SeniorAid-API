import express from 'express';
import caregiverRouter from './caregiverRouter';
import caregiverServiceRouter from './caregiverServiceRouter';
import feedbackRouter from './feedbackRouter';
import seniorRouter from './seniorRouter';
import seniorServiceRouter from './seniorServiceRouter';
import serviceRequestRouter from './serviceRequestRouter';
import userRouter from './userRouter';

const router = (app: express.Router) => {
    app.use(
        '/',
        caregiverRouter,
        caregiverServiceRouter,
        feedbackRouter,
        seniorRouter,
        seniorServiceRouter,
        serviceRequestRouter,
        userRouter
    );
};

export default router;

import express from 'express';
import SeniorServiceRouter from './SeniorServiceRouter';
import CaregiverRouter from './CaregiverRouter';
import CaregiverServiceRouter from './CaregiverServiceRouter';
import SeniorRouter from './SeniorRouter';
import ServiceRequestRouter from './ServiceRequestRouter';
import UserRouter from './UserRouter';
import FeedbackRouter from './FeedbackRouter';

const router = (app: express.Router) => {
    app.use(
        '/',
        CaregiverRouter,
        CaregiverServiceRouter,
        SeniorRouter,
        SeniorServiceRouter,
        ServiceRequestRouter,
        UserRouter,
        FeedbackRouter
    );
};

export default router;

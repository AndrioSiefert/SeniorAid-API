import express from 'express';
import SeniorServiceRouter from './SeniorServiceRouter';
import CaregiverRouter from './CaregiverRouter';
import CaregiverServiceRouter from './CaregiverServiceRouter';
import SeniorRouter from './SeniorRouter';
import ServiceRequestRouter from './ServiceRequestRouter';

const router = (app: express.Router) => {
    app.use(
        '/',
        CaregiverRouter,
        CaregiverServiceRouter,
        SeniorRouter,
        SeniorServiceRouter,
        ServiceRequestRouter
    );
};

export default router;

import express from 'express';
// import admRouter from './admRouter.js';
import caregiverRouter from './caregiverRouter.js';
import seniorRouter from './seniorRouter.js';
import serviceRequestRouter from './serviceRequestRouter.js';
import ServiceSeniorRouter from './ServiceSeniorRouter.js';
import caregiverServiceRouter from './caregiverServiceRouter.js';

const router = (app: express.Router) => {
    app.use(
        '/',
        caregiverRouter,
        // admRouter,
        seniorRouter,
        ServiceSeniorRouter,
        caregiverServiceRouter,
        serviceRequestRouter
    );
};

export default router;

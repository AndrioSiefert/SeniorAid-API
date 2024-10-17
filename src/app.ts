import 'express-async-errors';
import express from 'express';
import router from './routes';
import 'reflect-metadata';
import { AppDataSource } from './config/dataSource.js';
import cors from 'cors';
import { errorMiddleware } from './middleware/errorMiddleware';

const app = express();
app.use(cors());
app.use(express.json());
router(app);

app.use(errorMiddleware);

AppDataSource.initialize()
    .then(() => {
        console.log('Conectado ao banco de dados');
    })
    .catch(error => {
        console.log(error);
    });

export default app;

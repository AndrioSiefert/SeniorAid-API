import { DataSource } from 'typeorm';

// import AdmEntity from '../entities/AdmEntity.js';
import CaregiverEntity from '../entities/CaregiverEntity.js';
import CaregiverServiceEntity from '../entities/CaregiverServiceEntity.js';
import SeniorEntity from '../entities/SeniorEntity.js';
import SeniorServiceEntity from '../entities/SeniorServiceEntity.js';
import ServiceRequestEntity from '../entities/ServiceRequestEntity.js';
import FeedbackEntity from '../entities/FeedbackEntity.js';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './src/config/database.sqlite',
    entities: [
        CaregiverEntity,
        CaregiverServiceEntity,
        SeniorEntity,
        SeniorServiceEntity,
        ServiceRequestEntity,
        FeedbackEntity
    ],
    synchronize: true
});

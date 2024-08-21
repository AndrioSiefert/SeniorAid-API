import dotenv from 'dotenv';
import Controllers from './Controllers.js';
import CaregiverRepository from '../repository/CaregiverRepository.js';
dotenv.config();

class CaregiverController extends Controllers<CaregiverRepository> {
    constructor(repository: CaregiverRepository) {
        super(repository);
    }
}

export default CaregiverController;

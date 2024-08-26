import { Repository } from 'typeorm';
import CaregiverEntity from '../entities/CaregiverEntity.js';
import GenericRepository from './GenericRepository.js';

class CaregiverRepository extends GenericRepository<CaregiverEntity> {
    constructor(caregiverRepository: Repository<CaregiverEntity>) {
        super(caregiverRepository);
    }
}

export default CaregiverRepository;

import { Repository } from 'typeorm';
import CaregiverEntityService from '../entities/CaregiverEntity-Service';
import GenericRepository from './GenericRepository';

class CaregiverServiceRepository extends GenericRepository<CaregiverEntityService> {
    constructor(services: Repository<CaregiverEntityService>) {
        super(services);
    }

    async checkService(caregiverId: string) {
        return await this.repository.findOne({
            where: { caregiverId },
            relations: ['caregiver']
        });
    }
}

export default CaregiverServiceRepository;

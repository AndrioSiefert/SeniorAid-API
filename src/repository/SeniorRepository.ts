import { Repository } from 'typeorm';
import SeniorEntity from '../entities/SeniorEntity';
import GenericRepository from './GenericRepository';

class SeniorRepository extends GenericRepository<SeniorEntity> {
    constructor(seniorRepository: Repository<SeniorEntity>) {
        super(seniorRepository);
    }
}

export default SeniorRepository;

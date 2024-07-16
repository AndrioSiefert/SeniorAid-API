import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import CaregiverEntity from '../entities/CaregiverEntity.js';
import GenericRepository from './GenericRepository.js';

class CaregiverRepository extends GenericRepository<CaregiverEntity> {
    constructor(caregiverRepository: Repository<CaregiverEntity>) {
        super(caregiverRepository);
    }

    async login(
        email: string,
        password: string
    ): Promise<CaregiverEntity | null> {
        const user = await this.repository.findOne({
            where: { email: email }
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        return isPasswordValid ? user : null;
    }

    async findByEmail(email: string): Promise<CaregiverEntity | null> {
        return await this.repository.findOne({
            where: { email }
        });
    }
}

export default CaregiverRepository;

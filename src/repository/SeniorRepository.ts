import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import SeniorEntity from '../entities/SeniorEntity';
import GenericRepository from './GenericRepository';

class SeniorRepository extends GenericRepository<SeniorEntity> {
    constructor(seniorRepository: Repository<SeniorEntity>) {
        super(seniorRepository);
    }

    // async login(email: string, password: string): Promise<SeniorEntity | null> {
    //     const user = await this.repository.findOne({
    //         where: { email: email }
    //     });
    //     if (!user) {
    //         return null;
    //     }
    //     const isPasswordValid = bcrypt.compareSync(password, user.password);
    //     return isPasswordValid ? user : null;
    // }
}

export default SeniorRepository;

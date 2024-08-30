import bcrypt from 'bcrypt';
import UserEntity from '../entities/UserEntity';
import { DataSource, Repository } from 'typeorm';
import GenericRepository from './GenericRepository';
import dotenv from 'dotenv';
import CaregiverEntity from '../entities/CaregiverEntity';
import SeniorEntity from '../entities/SeniorEntity';
dotenv.config();

class UserRepository extends GenericRepository<UserEntity> {
    private dataSource: DataSource;
    constructor(dataSource: DataSource) {
        super(dataSource.getRepository(UserEntity));
        this.dataSource = dataSource;
    }

    getCaregiverRepository(): Repository<CaregiverEntity> {
        return this.dataSource.getRepository(CaregiverEntity);
    }

    getSeniorRepository(): Repository<SeniorEntity> {
        return this.dataSource.getRepository(SeniorEntity);
    }

    createUser(entity: UserEntity): UserEntity {
        return this.repository.create(entity);
    }

    async getByEmail(email: string): Promise<UserEntity | null> {
        return this.repository.findOne({
            where: { email }
        });
    }

    async login(email: string, password: string): Promise<UserEntity | null> {
        const user = await this.repository.findOne({
            where: { email: email }
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        return isPasswordValid ? user : null;
    }
}

export default UserRepository;

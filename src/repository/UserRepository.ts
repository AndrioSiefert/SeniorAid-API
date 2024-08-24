import bcrypt from 'bcrypt';
import UserEntity from '../entities/UserEntity';
import { DataSource, Repository } from 'typeorm';
import GenericRepository from './GenericRepository';
import dotenv from 'dotenv';
import CaregiverEntity from '../entities/CaregiverEntity';
import SeniorEntity from '../entities/SeniorEntity';
dotenv.config();

class UserRepository extends GenericRepository<UserEntity> {
    getRepository(): Repository<UserRepository> {
        throw new Error('Method not implemented.');
    }
    private dataSource: DataSource;

    constructor(entity: Repository<UserEntity>, dataSource: DataSource) {
        super(entity);
        this.dataSource = dataSource;
    }

    getCaregiverRepository(): Repository<CaregiverEntity> {
        return this.dataSource.getRepository(CaregiverEntity);
    }

    getSeniorRepository(): Repository<SeniorEntity> {
        return this.dataSource.getRepository(SeniorEntity);
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

    async save(entity: UserEntity): Promise<UserEntity> {
        return this.repository.save(entity);
    }

    createUser(entity: UserEntity): UserEntity {
        return this.repository.create(entity);
    }
}

export default UserRepository;

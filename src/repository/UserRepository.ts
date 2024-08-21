import bcrypt from 'bcrypt';
import UserEntity from '../entities/UserEntity';
import { Repository } from 'typeorm';
import GenericRepository from './GenericRepository';
import dotenv from 'dotenv';
dotenv.config();

class UserRepository extends GenericRepository<UserEntity> {
    constructor(entity: Repository<UserEntity>) {
        super(entity);
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
        return await this.repository.save(entity);
    }

    createUser(entity: UserEntity): UserEntity {
        const newUser = this.repository.create(entity);
        return newUser;
    }
}

export default UserRepository;

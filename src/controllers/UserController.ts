import dotenv from 'dotenv';
import UserRepository from '../repository/UserRepository';
import Controllers from './Controllers';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import SeniorEntity from '../entities/SeniorEntity';
import CaregiverEntity from '../entities/CaregiverEntity';
dotenv.config();

class UserController extends Controllers<UserRepository> {
    constructor(repository: UserRepository) {
        super(repository);
    }
    createUser = async (req: Request, res: Response) => {
        const existingUser = await this.repository.getByEmail(req.body.email);
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já cadastrado' });
        }

        const dados = req.body;
        const password_confirmation = req.body.password_confirmation;

        try {
            if (dados.password !== password_confirmation) {
                return res
                    .status(400)
                    .json({ error: 'As senhas não coincidem' });
            }

            if (
                dados.user_type !== 'senior' &&
                dados.user_type !== 'caregiver'
            ) {
                return res
                    .status(400)
                    .json({ error: 'Tipo de usuário inválido' });
            }

            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(dados.password, saltRounds);
            dados.password = hashedPassword;

            const newEntity = this.repository.createUser(dados);
            const savedEntity = await this.repository.save(newEntity);

            if (savedEntity.user_type === 'senior') {
                const seniorRepo = this.repository.getSeniorRepository();
                const seniorEntity = new SeniorEntity(
                    savedEntity.name,
                    savedEntity.email,
                    savedEntity.password,
                    savedEntity.cpf,
                    savedEntity.age,
                    savedEntity.phone,
                    savedEntity.cep,
                    savedEntity.neighborhood,
                    savedEntity.city,
                    savedEntity.state,
                    savedEntity.street,
                    savedEntity.address_number,
                    savedEntity.photo
                );
                seniorEntity.user = savedEntity;
                await seniorRepo.save(seniorEntity);
            } else if (savedEntity.user_type === 'caregiver') {
                const caregiverRepo = this.repository.getCaregiverRepository();
                const caregiverEntity = new CaregiverEntity(
                    savedEntity.name,
                    savedEntity.email,
                    savedEntity.password,
                    savedEntity.cpf,
                    savedEntity.age,
                    savedEntity.phone,
                    savedEntity.cep,
                    savedEntity.neighborhood,
                    savedEntity.city,
                    savedEntity.state,
                    savedEntity.street,
                    savedEntity.address_number,
                    savedEntity.photo
                );
                caregiverEntity.user = savedEntity;
                await caregiverRepo.save(caregiverEntity);
            }

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                return res
                    .status(500)
                    .json({ error: 'Erro interno do servidor' });
            }
            const token = jwt.sign(
                {
                    id: savedEntity.id,
                    name: savedEntity.name,
                    userType: savedEntity.user_type
                },
                jwtSecret,
                { expiresIn: '1h' }
            );
            res.status(201).json({
                entity: savedEntity,
                token: token,
                userType: savedEntity.user_type,
                message: `criado com sucesso`
            });
        } catch (error) {
            console.error('Erro ao criar entidade:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const loginUser = await this.repository.login(email, password);

            if (loginUser) {
                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    return res
                        .status(500)
                        .json({ error: 'Erro interno do servidor' });
                }
                const token = jwt.sign(
                    {
                        id: loginUser.id,
                        name: loginUser.name,
                        userType: loginUser.user_type
                    },
                    jwtSecret,
                    { expiresIn: '1h' }
                );
                res.status(200).json({
                    user: loginUser,
                    token: token,
                    userType: loginUser.user_type,
                    message: 'Usuário logado com sucesso'
                });
            } else {
                res.status(400).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    };
}

export default UserController;

import dotenv from 'dotenv';
import UserRepository from '../repository/UserRepository';
import Controllers from './Controllers';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import SeniorEntity from '../entities/SeniorEntity';
import CaregiverEntity from '../entities/CaregiverEntity';
import userSchema from '../schemas/userSchema';
import encryptPassword from '../common/encryptPassword';
import { BadRequest, Erro } from '../common/erro';
dotenv.config();

class UserController extends Controllers<UserRepository> {
    constructor(repository: UserRepository) {
        super(repository);
    }

    createUser = async (req: Request, res: Response) => {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await this.repository.getByEmail(req.body.email);
        if (existingUser) {
            throw new BadRequest('Email já cadastrado');
        }

        const dados = req.body;
        const requestImage = req.file as Express.Multer.File;

        if (!requestImage) {
            throw new BadRequest('Imagem não enviada');
        }
        const imageFilename = requestImage.filename;
        console.log(`Image uploaded: ${imageFilename}`);
        dados.photo = imageFilename;

        try {
            dados.password = encryptPassword(dados.password);

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
                    savedEntity.gender,
                    savedEntity.phone,
                    savedEntity.cep,
                    savedEntity.neighborhood,
                    savedEntity.city,
                    savedEntity.state,
                    savedEntity.street,
                    savedEntity.address_number,
                    savedEntity.photo,
                    savedEntity.user_type,
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
                    savedEntity.gender,
                    savedEntity.phone,
                    savedEntity.cep,
                    savedEntity.neighborhood,
                    savedEntity.city,
                    savedEntity.state,
                    savedEntity.street,
                    savedEntity.address_number,
                    savedEntity.photo,
                    savedEntity.user_type,
                );
                caregiverEntity.user = savedEntity;
                await caregiverRepo.save(caregiverEntity);
            }

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                return res.status(500).json({
                    error: 'Erro interno do servidor',
                });
            }
            const token = jwt.sign(
                {
                    id: savedEntity.id,
                    name: savedEntity.name,
                    userType: savedEntity.user_type,
                    caregiverId: savedEntity.caregiver?.id,
                    seniorId: savedEntity.senior?.id,
                    photo: savedEntity.photo,
                },
                jwtSecret,
                { expiresIn: '1h' },
            );
            res.status(201).json({
                entity: savedEntity,
                token: token,
                userType: savedEntity.user_type,
                photo: savedEntity.photo,
                message: `criado com sucesso`,
            });
        } catch (error) {
            console.error('Erro ao criar entidade:', error);
            res.status(500).json({
                error: 'Erro interno do servidor',
            });
        }
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const loginUser = await this.repository.login(email, password);

        if (loginUser) {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Erro('Erro interno do servidor', 500);
            }
            const token = jwt.sign(
                {
                    id: loginUser.id,
                    name: loginUser.name,
                    userType: loginUser.user_type,
                    caregiverId: loginUser.caregiver?.id,
                    seniorId: loginUser.senior?.id,
                    photo: loginUser.photo,
                },
                jwtSecret,
                { expiresIn: '1h' },
            );
            res.status(200).json({
                user: loginUser,
                token: token,
                userType: loginUser.user_type,
                message: 'Usuário logado com sucesso',
            });
        } else {
            throw new Erro('Usuário ou senha inválidos', 401);
        }
    };
}

export default UserController;

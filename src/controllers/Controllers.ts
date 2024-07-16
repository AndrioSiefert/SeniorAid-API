import dotenv from 'dotenv';
import { Request, Response } from 'express';
import GenericRepository from '../repository/GenericRepository.js';
import jwt from 'jsonwebtoken';
dotenv.config();
class Controllers<T extends GenericRepository<any>> {
    protected repository: T;

    constructor(repository: T) {
        this.repository = repository;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const entities = await this.repository.getAll();
            res.status(200).json(entities);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const entity = await this.repository.getById(id);

            if (entity === null || entity === undefined) {
                return res.status(404).json({ message: 'not found' });
            }

            return res.status(200).json(entity);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    create = async (req: Request, res: Response) => {
        const dados = req.body;
        try {
            await this.repository.create(dados);
            res.status(200).json(dados);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    createUser = async (req: Request, res: Response) => {
        const dados = req.body;
        try {
            const newEntity = await this.repository.create(dados);
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                return res
                    .status(500)
                    .json({ error: 'Erro interno do servidor' });
            }

            const token = jwt.sign(
                {
                    id: newEntity.id,
                    name: newEntity.name,
                    userType: newEntity.userType
                },
                jwtSecret,
                { expiresIn: '1h' }
            );

            res.status(201).json({
                entity: newEntity,
                token: token,
                userType: newEntity.userType,
                message: `criado com sucesso`
            });
        } catch (error) {
            console.error('Erro ao criar entidade:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const entity = req.body;

        try {
            const updatedEntity = await this.repository.update(id, entity);
            if (!updatedEntity) {
                return res.status(404).json({ message: 'Entity not found' });
            }
            res.status(200).json(updatedEntity);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await this.repository.delete(id);
        try {
            if (result.message === 'Entity not found') {
                return res.status(404).json(result);
            }
            await this.repository.delete(id);
            res.status(200).json({ message: 'Deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}

export default Controllers;

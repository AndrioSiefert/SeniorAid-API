import dotenv from 'dotenv';
import Controllers from './Controllers.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import CaregiverRepository from '../repository/CaregiverRepository.js';
dotenv.config();

class CaregiverController extends Controllers<CaregiverRepository> {
    constructor(repository: CaregiverRepository) {
        super(repository);
    }

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
                        userType: loginUser.userType
                    },
                    jwtSecret,
                    { expiresIn: '1h' }
                );
                res.status(200).json({
                    user: loginUser,
                    token: token,
                    userType: loginUser.userType,
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

export default CaregiverController;

import { Request, Response, NextFunction } from 'express';
import { BadRequest } from '../common/erro';

export const idCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const params = { ...req.params };

    for (const param in params) {
        if (!Number.isInteger(Number(params[param])))
            throw new BadRequest(`Invalido id, deve conter apenas numeros ${param}`);
    }
};

// middleware para verificar se o id passado na rota é um número

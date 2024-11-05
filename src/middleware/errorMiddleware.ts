import { NextFunction, Request, Response } from 'express';
import { Erro } from '../common/erro';
import { EnumHttpStatusCode } from '../enum/StatusCodeEnum';

export const errorMiddleware = (erro: Erro, req: Request, res: Response, next: NextFunction) => {
    const statusCode = erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

    const message = erro.statusCode ? erro.message : 'Internal Server Error';

    res.status(statusCode).json({ message });
    return next();
};

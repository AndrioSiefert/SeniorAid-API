import { NextFunction, Request, Response } from 'express';
import { erro } from '../common/erro';
import { EnumHttpStatusCode } from '../enum/StatusCodeEnum';

export const errorMiddleware = (erro: erro, req: Request, res: Response, next: NextFunction) => {
    const statusCode = erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

    const message = erro.statusCode ? erro.message : 'Internal Server Error';

    res.status(statusCode).json({ message });
    return next();
};

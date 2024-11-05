import { EnumHttpStatusCode } from '../enum/StatusCodeEnum';

export class Erro extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequest extends Erro {
    // Erro de requisição inválida
    constructor(message: string) {
        super(message, EnumHttpStatusCode.BAD_REQUEST);
    }
}

export class NotFound extends Erro {
    // Erro de recurso não encontrado
    constructor(message: string) {
        super(message, EnumHttpStatusCode.NOT_FOUND);
    }
}

export class Conflict extends Erro {
    // Erro de conflito já criado
    constructor(message: string) {
        super(message, EnumHttpStatusCode.CONFLICT);
    }
}

import { Request } from 'express';
import multer, { Options } from 'multer';
import path from 'path';
import fs from 'fs';

// Caminho para o diretório de armazenamento das imagens
const storagePath = path.join(__dirname, '..', '..', 'public/images');

// Verifica se o diretório existe, caso contrário, cria-o
fs.mkdirSync(storagePath, { recursive: true });

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req: Request, file, callback) => {
        callback(null, storagePath); // Armazena as imagens no diretório especificado
    },
    filename: (req: Request, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`); // Renomeia o arquivo com timestamp
    },
});

// Exporta a configuração do multer
export default {
    storage: storage,
    limits: {
        fileSize: 8 * 1024 * 1024, // Limite de tamanho do arquivo: 8MB
    },
    fileFilter: (req: any, file: any, callback: any) => {
        // Tipos de MIME permitidos
        const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (mimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Tipo de arquivo inválido'));
        }
    },
} as Options;

// src/schemas/userSchema.ts
import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
    password_confirmation: Joi.ref('password'),
    cpf: Joi.string().length(11).required(),
    age: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/) // Formato DD/MM/YYYY  => peguei no regedix101.com
        .required()
        .messages({
            'string.pattern.base': 'A data deve estar no formato DD/MM/YYYY',
        }),
    gender: Joi.string().valid('man', 'woman').required(),
    phone: Joi.string().required(),
    cep: Joi.string().required(),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    street: Joi.string().required(),
    address_number: Joi.number().integer().required(),
    // photo: Joi.required(),
    user_type: Joi.string().valid('senior', 'caregiver').required(),
});

export default userSchema;

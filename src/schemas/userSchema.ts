import Joi, { required } from 'joi';

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
    password_confirmation: Joi.ref('password'),
    cpf: Joi.string().length(11).required(),
    age: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/) // regex101.com/
        .required()
        .messages({
            'string.pattern.base': 'A data deve estar no formato DD/MM/YYYY',
        }),
    gender: Joi.string().valid('man', 'woman').required(),
    phone: Joi.string()
        .required()
        // .pattern(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm)
        .required()
        .messages({
            'string.pattern.base': 'O telefone deve estar no formato (XX) XXXX-XXXX',
        }),
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

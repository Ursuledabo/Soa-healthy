import Joi from 'joi';

export const doctorSchema = {
    singupDoctor:Joi.object({
        doctorName: Joi.string().required(),
        doctorMail: Joi.string().email().required(),
        doctorPassword: Joi.string().required(),
        doctorIsMale: Joi.boolean().required(),
        doctorAdress: Joi.string().required(),
        doctorContact: Joi.string().required(),
        doctorSpeciality: Joi.string().required(),
        doctorGraduation: Joi.string().required(),
    }),
    loginDoctor:Joi.object({
        doctorMail: Joi.string().email().required(),
        doctorPassword: Joi.string().required(),
    })
};
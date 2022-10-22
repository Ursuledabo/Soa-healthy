import Joi from 'joi';

export const patientSchema = {
    singupPatient:Joi.object({
        patientName: Joi.string().required(),
        patientMail: Joi.string().email().required(),
        patientPassword: Joi.string().required(),
        patientIsMale: Joi.boolean().required(),
        patientAdress: Joi.string().required(),
        patientContact: Joi.string().required(),
        patientBloodType: Joi.string().required(),
    }),
    loginPatient:Joi.object({
        patientMail: Joi.string().email().required(),
        patientPassword: Joi.string().required(),
    })
};
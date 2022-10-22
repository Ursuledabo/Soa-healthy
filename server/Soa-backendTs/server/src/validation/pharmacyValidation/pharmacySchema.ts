import Joi from 'joi';

export const PharmacySchema = {
    signupPharmacy:Joi.object({
        pharmacyName: Joi.string().required(),
        pharmacyAdress: Joi.string().required(),
        pharmacyMail: Joi.string().email().required(),
        pharmacyPassword: Joi.string().required(),
        pharmacyContact: Joi.string().required(),
        pharmacyIdentification: Joi.string().required()
    }),
    loginPharmacy:Joi.object({
        pharmacyMail: Joi.string().email().required(),
        pharmacyPassword: Joi.string().required()
    })
};
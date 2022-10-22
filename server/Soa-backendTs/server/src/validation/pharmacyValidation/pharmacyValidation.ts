import { RequestHandler } from "express";
import { PharmacySchema } from "./pharmacySchema";
import validator from '../utils/validator';

export const signupPharmacyValidation: RequestHandler = (req,res,next) => {
    validator(PharmacySchema.signupPharmacy, req.body, next);
}

export const loginPharmacyValidation: RequestHandler = (req,res,next) => {
    validator(PharmacySchema.loginPharmacy, req.body, next);
}
import { RequestHandler } from "express"
import validator from "../utils/validator"
import { patientSchema } from "./patientSchema"

export const signupPatientValidation: RequestHandler = (req, res, next) => { validator(patientSchema.singupPatient, req.body, next) };
export const loginPatientValidation: RequestHandler = (req, res, next) => { validator(patientSchema.loginPatient, req.body, next) }

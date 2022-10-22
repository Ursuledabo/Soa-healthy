import { RequestHandler } from "express"
import validator from "../utils/validator"
import { doctorSchema } from "./doctorSchema"

export const signupDoctorValidation: RequestHandler = (req, res, next) =>
 { validator(doctorSchema.singupDoctor, req.body, next) };
export const loginDoctorValidation: RequestHandler = (req, res, next) => 
{ validator(doctorSchema.loginDoctor, req.body, next) }

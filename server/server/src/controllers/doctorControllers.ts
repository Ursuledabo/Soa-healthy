import { RequestHandler } from "express";
import Doctor from "../model/Doctor";
import bcrypt from "bcrypt"
import createHttpError, {InternalServerError} from "http-errors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { FRONTEND_URL, JWT_SECRET, transporter } from "../config";

export const signupDoctor:RequestHandler = async (req, res, next) => {
    const {
        doctorName,
        doctorMail,
        doctorPassword,
        doctorIsMale,
        doctorAdress,
        doctorContact,
        doctorSpeciality,
        doctorGraduation} = req.body;
        

        
        try {
            const existingDoctor = await Doctor.findOne({doctorMail});
        if(existingDoctor) return next(createHttpError(422, "email already exists"));
        
        const hashedPassword = await bcrypt.hash(doctorPassword, 8);
            const newDoctor = new Doctor({
                doctorName,
                doctorMail,
                doctorPassword: hashedPassword,
                doctorIsMale,
                doctorAdress,
                doctorContact,
                doctorSpeciality,
                doctorGraduation});
            await newDoctor.save();            
            res.json({message:"doctor created"});
    } catch (error) {
            return next(InternalServerError);
        }
}

export const loginDoctor:RequestHandler = async (req, res, next) => {
    const {doctorMail, doctorPassword} = req.body;
    try {
        const doctor = await Doctor.findOne({doctorMail});
        if(!doctor) return next(createHttpError(404, "doctor not found"));
        const isPasswordValid = await bcrypt.compare(doctorPassword, doctor.doctorPassword);
        if(!doctor.doctorIsVerified) return next(createHttpError(406, "User not verified"))
        if(!isPasswordValid) return next(createHttpError(401, "invalid password"));
        const token = jwt.sign({
            doctorname: doctor.doctorName,
            doctoremail: doctor.doctorMail,
            doctorid: doctor._id}, 
            process.env.JWT_SECRET as string, 
            {
                expiresIn: "12h"
            }
        );

        res.cookie("jwt", token);

        res.json({message:"login successful as", token});
    } catch (error) {
        return next(InternalServerError);
    }
}


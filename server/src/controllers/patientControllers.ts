import { RequestHandler } from "express";
import Patient from "../model/Patient";
import bcrypt from "bcrypt"
import createHttpError, {InternalServerError} from "http-errors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { FRONTEND_URL, JWT_SECRET, transporter } from "../config";

export const signupPatient:RequestHandler = async (req, res, next) => {
    const {patientName,
        patientMail,
        patientPassword,
        patientIsMale,
        patientAdress,
        patientContact,
        patientBloodType} = req.body;

        
        try {
            const existingPatient = await Patient.findOne({patientMail});
        if(existingPatient) return next(createHttpError(422, "email already exists"));
        
        const hashedPassword = await bcrypt.hash(patientPassword, 8);
            const newPatient = new Patient({
                patientName,
                patientMail,
                patientPassword: hashedPassword,
                patientIsMale,
                patientAdress,
                patientContact,
                patientBloodType});
            await newPatient.save();            
            res.json({message:"patient created"});
    } catch (error) {
            return next(InternalServerError);
        }
}

export const loginPatient:RequestHandler = async (req, res, next) => {
    const {patientMail, patientPassword} = req.body;
    try {
        const patient = await Patient.findOne({patientMail});
        if(!patient) return next(createHttpError(404, "patient not found"));
        const isPasswordValid = await bcrypt.compare(patientPassword, patient.patientPassword);
        if(!patient.patientIsVerified) return next(createHttpError(406, "User not verified"))
        if(!isPasswordValid) return next(createHttpError(401, "invalid password"));
        const token = jwt.sign({
            Patientname: patient.patientName,
            Patientemail: patient.patientMail,
            Patientid: patient._id}, 
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

export const sendVerificationMail:RequestHandler = async (req, res, next) => {
    const {patientMail}: {patientMail:string} = req.body;

try {
    const patient = await Patient.findOne({patientMail});
    if(!patient) return next(createHttpError(404, "patient not found"));

    if(patient.patientIsVerified) return next(createHttpError(406, "patient already verified"));

    const encryptedtoken = await bcrypt.hash(patient._id.toString(), 8);

    const jwtToken = jwt.sign({patientid: patient._id},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}); 

      // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <sesedra@gmail.com>', // sender address
    to: `${patientMail}`, // list of receivers
    subject: "Email test nodemailer", // Subject line
    // text: "Hello world?", // plain text body
    html: `Your verification link <a href="${FRONTEND_URL}/forgot-password-verify/${jwtToken}">Link</a>`, // html body
  });

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...



    await patient.updateOne({$set: {verifyToken : encryptedtoken} });

    res.json({message : `Preview URL: %s, ${nodemailer.getTestMessageUrl(info)}`,
}); 

} catch (error) {
    return next(InternalServerError);
}
}

export const verifyPatientMail:RequestHandler = async (req, res, next) => {
    const {token}:{token:string} = req.body;

    try {
        const decodedToken:any = jwt.verify(token, JWT_SECRET);

        const patient = await Patient.findById(decodedToken.patientid);
        if(!patient) return next(createHttpError(401, "Token invalide"));

        await patient.updateOne({
            $set: {patientIsVerified: true},
            $unset: {verifyToken: 0},
        });

        res.json({message: "Email verified"})

    } catch (error) {
        return next(createHttpError(401, "Token invalide"))
    }
}
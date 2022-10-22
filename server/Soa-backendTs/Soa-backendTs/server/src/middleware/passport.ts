import { Request } from "express";
import { PassportStatic } from "passport";
import Patient from "../model/Patient";
import passportJwt from "passport-jwt";
import {JWT_SECRET} from "../config/index.js"

const {Strategy} = passportJwt

const cookieExtractor = (req: Request) => {
    let jwt = null;
    if (req && req.cookies) {
        jwt = req.cookies?.jwt;
    }
    return jwt;
}

const optionsCookie = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET as string,
};

export default (passport: PassportStatic) => {
    passport.use
    (new Strategy(optionsCookie, async (payload, done) => {
        try {
            const patient = await Patient.findById(payload.Patientid);
            if (patient) {
                return done(null, patient);
            }
            return done(null, false);
        } catch (error) {
            console.log(error);
        }
    }));
};

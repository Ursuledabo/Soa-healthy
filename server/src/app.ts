import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors"
import mongoose from 'mongoose'
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan";
import patientRoutes from "./routes/patientRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import passport from "passport";
import kPassport from "./middleware/passport";
import cookieParser from "cookie-parser";
import exampleRoutes from "./routes/exampleRoutes";
import pharmacyRoutes from "./routes/pharmacyRoutes";
import { rechercheUser } from "./controllers/loginController";
import medocRoutes from "./routes/medocRoutes";

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(passport.initialize());
kPassport(passport);

app.use(morgan("dev"));
 
app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);
app.use('/example', exampleRoutes);
app.use('/pharmacy', pharmacyRoutes);
app.post('/test', rechercheUser);
app.use('/medoc', medocRoutes);

app.get("/", (req,res)=>{
    res.json({
        message: "hello World"
    })
});

app.use(()=> {
     throw createHttpError(404, "Route introuvable");
});

app.use(errorHandler);

mongoose
    //.connect(DB)
    .connect("mongodb://localhost:27017/soa")
    .then(()=> {
    console.log("Connexion réussie");
    app.listen(PORT, ()=> {
        console.log(`Listening on Port ${PORT}`)
    });
})
    .catch(()=> {
        throw createHttpError(501, "Connexion échouée");
    });
import { Router } from "express";
import { loginPatient, sendVerificationMail, signupPatient, verifyPatientMail } from "../controllers/patientControllers";
import { loginPatientValidation, signupPatientValidation} from "../validation/patientValidation/patientValidation";

const router = Router();

router.post("/signup",signupPatientValidation,signupPatient); 
router.post("/login",loginPatientValidation,loginPatient);
router.post("/send-verification-mail", sendVerificationMail);
router.post("/verify-mail", verifyPatientMail);

export default router;
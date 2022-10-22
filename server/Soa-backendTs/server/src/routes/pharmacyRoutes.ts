import {Router} from "express";
import { loginPharmacy, signupPharmacy } from "../controllers/pharmacyControllers";
import { loginPharmacyValidation, signupPharmacyValidation } from "../validation/pharmacyValidation/pharmacyValidation";

const router = Router();

router.post("/signup",signupPharmacyValidation,signupPharmacy);
router.post("/login",loginPharmacyValidation,loginPharmacy);

export default router;
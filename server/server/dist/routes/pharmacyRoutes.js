"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pharmacyControllers_1 = require("../controllers/pharmacyControllers");
const pharmacyValidation_1 = require("../validation/pharmacyValidation/pharmacyValidation");
const router = (0, express_1.Router)();
router.post("/signup", pharmacyValidation_1.signupPharmacyValidation, pharmacyControllers_1.signupPharmacy);
router.post("/login", pharmacyValidation_1.loginPharmacyValidation, pharmacyControllers_1.loginPharmacy);
exports.default = router;

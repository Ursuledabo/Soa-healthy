"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorControllers_1 = require("../controllers/doctorControllers");
const doctorValidation_1 = require("../validation/doctorValidation/doctorValidation");
const router = (0, express_1.Router)();
router.post("/signup", doctorValidation_1.signupDoctorValidation, doctorControllers_1.signupDoctor);
router.post("/login", doctorValidation_1.loginDoctorValidation, doctorControllers_1.loginDoctor);
exports.default = router;

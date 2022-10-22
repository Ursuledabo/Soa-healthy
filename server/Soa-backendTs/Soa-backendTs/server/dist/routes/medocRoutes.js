"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medocControllers_1 = require("../controllers/medocControllers");
const router = (0, express_1.Router)();
router.post("/add", medocControllers_1.testAdd10RandomMedoc);
router.post("/addone", medocControllers_1.addMedoc);
exports.default = router;

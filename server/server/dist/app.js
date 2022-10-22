"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const errorHandler_1 = require("./middleware/errorHandler");
const morgan_1 = __importDefault(require("morgan"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middleware/passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
const pharmacyRoutes_1 = __importDefault(require("./routes/pharmacyRoutes"));
const loginController_1 = require("./controllers/loginController");
const medocRoutes_1 = __importDefault(require("./routes/medocRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
(0, passport_2.default)(passport_1.default);
app.use((0, morgan_1.default)("dev"));
app.use('/patient', patientRoutes_1.default);
app.use('/doctor', doctorRoutes_1.default);
app.use('/example', exampleRoutes_1.default);
app.use('/pharmacy', pharmacyRoutes_1.default);
app.post('/test', loginController_1.rechercheUser);
app.use('/medoc', medocRoutes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "hello World"
    });
});
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route introuvable");
});
app.use(errorHandler_1.errorHandler);
mongoose_1.default
    .connect(config_1.DB)
    .then(() => {
    console.log("Connexion réussie");
    app.listen(config_1.PORT, () => {
        console.log(`Listening on Port ${config_1.PORT}`);
    });
})
    .catch(() => {
    throw (0, http_errors_1.default)(501, "Connexion échouée");
});

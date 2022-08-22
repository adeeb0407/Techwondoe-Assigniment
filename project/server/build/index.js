"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config/config"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const reviewsRoutes_1 = __importDefault(require("./routes/reviewsRoutes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json({ limit: "30mb" }));
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
// const __dirname = path.dirname(__filename);
// app.use('/uploads', express.static(__dirname + "uploads"))
config_1.default.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`MYSQL Database connected`);
    }
});
// app.use(MainRouters)
app.use('/', userRoutes_1.default);
app.use('/', reviewsRoutes_1.default);
app.get("/", (req, res) => {
    res.json({ message: "TechWondo Server" });
});
app.listen(process.env.PORT, () => {
    console.log(`Server Running is http://localhost:${process.env.PORT}`);
});

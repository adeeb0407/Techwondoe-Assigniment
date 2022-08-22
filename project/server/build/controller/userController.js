"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getUsers = void 0;
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.getUsers = ((req, res) => {
    config_1.default.query('SELECT * from users', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
exports.login = ((req, res) => {
    const { username, password } = req.body;
    try {
        config_1.default.query('SELECT * from users WHERE username = ?', [username], (err, result) => {
            var _a, _b, _c, _d;
            if (err) {
                console.log(err);
            }
            else {
                if (result.length == 0) {
                    res.json("User Does not Exist");
                }
                else {
                    if (((_a = result[0]) === null || _a === void 0 ? void 0 : _a.password) !== password) {
                        res.json("Incorrect Password");
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({ email: (_b = result[0]) === null || _b === void 0 ? void 0 : _b.username }, "TRa4sdYR21ES", { expiresIn: "2h" });
                        res.status(200).json({ username: (_c = result[0]) === null || _c === void 0 ? void 0 : _c.username, user_id: (_d = result[0]) === null || _d === void 0 ? void 0 : _d.user_id, token });
                    }
                }
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});

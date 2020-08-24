"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupJwtUser = exports.loginJwtUser = exports.authWithFacebook = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authErrorMessage = "We didn't recognize the email or password you entered. Please try again";
const authWithFacebook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fbUserID, name, authType } = req.body;
    userSchema_1.default.findOne({ fbUserID: fbUserID })
        .then((user) => {
        if (user) {
            res.status(200).send(user);
        }
        else {
            userSchema_1.default.create({ fbUserID, name, authType })
                .then((user) => {
                res.status(201).send(user);
            })
                .catch((err) => {
                console.log(err);
                res.status(500).send("Internal server issue");
            });
        }
    })
        .catch((err) => console.log("Fail", err));
});
exports.authWithFacebook = authWithFacebook;
const signupJwtUser = (req, res) => {
    let { name, email, password, authType } = req.body;
    userSchema_1.default.findOne({ email }, (err, user) => {
        if (err)
            return res.status(400).send(err);
        if (!user) {
            //hash password
            bcrypt_1.default
                .hash(password, 10)
                .then((hashedPassword) => {
                userSchema_1.default.create({ name, email, authType, password: hashedPassword })
                    .then((newUser) => res.status(201).send(newUser))
                    .catch((err) => res.status(400).send(err));
            })
                .catch((err) => res
                .status(500)
                .send("Internal server issue"));
        }
        else {
            return res.status(404).send("This email is already registered");
        }
    });
};
exports.signupJwtUser = signupJwtUser;
const loginJwtUser = (req, res) => {
    const { email, password } = req.body;
    userSchema_1.default.findOne({ email }, (err, user) => {
        if (err)
            return res.status(400).send(err);
        if (user) {
            const { name, email, authType, _id, cars } = user;
            //check if password is correct
            bcrypt_1.default
                .compare(password, user.password)
                .then((result) => {
                if (result) {
                    //create and assign token
                    let TOKEN_SECRET = "anythingiwant";
                    const token = jsonwebtoken_1.default.sign({ _id }, TOKEN_SECRET);
                    res
                        .header("auth-token", token)
                        .send({ name, authType, email, token, _id, cars });
                }
                else {
                    return res.status(403).send(authErrorMessage);
                }
            })
                .catch((err) => res
                .status(500)
                .send("Internal server issue"));
        }
        else {
            return res.status(400).send(authErrorMessage);
        }
    });
};
exports.loginJwtUser = loginJwtUser;

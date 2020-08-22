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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const facebookAuthType = "facebook";
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const { authType } = req.params;
    authType === facebookAuthType
        ? verifyFbAccessToken(req, res, next, token)
        : verifyJsonWebToken(req, res, next, token);
};
const verifyJsonWebToken = (req, res, next, token) => {
    if (!token)
        return res.status(401).send("Access Denied");
    try {
        const verified = jsonwebtoken_1.default.verify(token, "anythingiwant");
        if (verified)
            return next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
};
const verifyFbAccessToken = (req, res, next, token) => __awaiter(void 0, void 0, void 0, function* () {
    const fbUserID = req.headers.fbuserid;
    const verifyTokenUrl = `https://z-p3-graph.facebook.com/v2.3/me?access_token=${token}&fields=name%2Cemail%2Cpicture&locale=en_US&method=get&pretty=0&sdk=joey&suppress_http_code=1`;
    if (!token)
        return res.status(401).send("Access Denied");
    try {
        const res = yield axios_1.default.get(verifyTokenUrl);
        if (res.data.id === fbUserID)
            return next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
});
exports.default = verifyToken;

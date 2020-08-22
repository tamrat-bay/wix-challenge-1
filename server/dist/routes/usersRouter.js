"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userHelper_1 = require("../helpers/userHelper");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.Router();
router.post("/signup", (req, res) => {
    userHelper_1.signupJwtUser(req, res);
});
router.post("/login", (req, res) => {
    userHelper_1.loginJwtUser(req, res);
});
router.post("/:authType", verifyToken_1.default, (req, res) => {
    userHelper_1.authWithFacebook(req, res);
});
exports.default = router;

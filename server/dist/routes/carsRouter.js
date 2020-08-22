"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const carHelpers_1 = require("../helpers/carHelpers");
const router = express_1.Router();
router.get("/:authType", verifyToken_1.default, (req, res) => {
    carHelpers_1.getCarsFromDb(req, res);
});
router.post("/:authType/:userID", verifyToken_1.default, (req, res) => {
    carHelpers_1.addCarToDb(req, res);
});
router.put("/:authType/:carID", verifyToken_1.default, (req, res) => {
    carHelpers_1.editCarDataInDb(req, res);
});
router.delete("/:authType/:userID/:carID", verifyToken_1.default, (req, res) => {
    carHelpers_1.deleteCarFromDb(req, res);
});
exports.default = router;

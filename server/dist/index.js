"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carHandler_1 = require("./handlers/carHandler");
const app = express_1.default();
const Port = process.env.PORT || 5000;
app.get("/cars", (req, res) => {
    return carHandler_1.getCars(req, res);
});
app.listen(Port, () => console.log(`Server is listening on port ${Port}`));

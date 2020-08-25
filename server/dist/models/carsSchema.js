"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
    id: Number,
    car: {
        type: String,
        required: true,
    },
    car_model: {
        type: String,
        required: true,
    },
    car_color: String,
    car_model_year: {
        type: Number,
        required: true,
    },
    car_vin: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true,
    },
    availability: Boolean,
    img: String
});
const Cars = mongoose_1.default.model("cars", carSchema);
exports.default = Cars;

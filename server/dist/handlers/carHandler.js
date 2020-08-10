"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCars = void 0;
const carsImagesArray_1 = require("./carsImagesArray");
const axios_1 = __importDefault(require("axios"));
// The API doesn't have images thats why i created this function to add img key to each car obj 
const addImgToCarObj = (carsArray, imagesArray) => {
    const carsWithImages = carsArray.map((car, i) => { return Object.assign(Object.assign({}, car), { img: imagesArray[i] }); });
    return carsWithImages;
};
const getCars = (req, res) => {
    return axios_1.default
        .get("https://myfakeapi.com/api/cars")
        .then((response) => {
        if (response.status === 200) {
            const carsData = response.data.cars.slice(0, 50);
            const carsWithImages = addImgToCarObj(carsData, carsImagesArray_1.mockCarsImages);
            return res.status(200).send(carsWithImages);
        }
    })
        .catch((err) => res.status(400).send(err));
};
exports.getCars = getCars;

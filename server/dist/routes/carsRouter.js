"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carsSchema_1 = __importDefault(require("../models/carsSchema"));
const router = express_1.Router();
router.get('/', (req, res) => {
    carsSchema_1.default.find({}).then(cars => res.status(200).send(cars.reverse()))
        .catch(err => res.status(404).send(err));
});
router.post('/', (req, res) => {
    const { car, car_model, car_model_year, img, price } = req.body;
    carsSchema_1.default.create({ car, car_model, car_model_year, img, price })
        .then(car => res.status(201).send(car))
        .catch(err => {
        console.log(err);
        res.status(500).send(`Server problem - ${err}`);
    });
});
router.put('/:id', (req, res) => {
    const newCar = req.body;
    const id = req.params.id;
    carsSchema_1.default.findByIdAndUpdate(id, newCar, { new: true })
        .then(car => res.status(200).send(car))
        .catch(err => res.status(400).send(err));
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    carsSchema_1.default.findByIdAndDelete(id)
        .then(car => res.status(200).send("Car object was deleted"))
        .catch(err => res.status(400).send(err));
});
exports.default = router;

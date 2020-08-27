"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCarsFromDb = exports.editCarDataInDb = exports.deleteCarFromDb = exports.addCarToDb = exports.getCarsFromDb = void 0;
const carsSchema_1 = __importDefault(require("../models/carsSchema"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const getCarsFromDb = (req, res) => {
    carsSchema_1.default.find({}).then(cars => res.status(200).send(cars.reverse()))
        .catch(err => res.status(404).send('Not found'));
};
exports.getCarsFromDb = getCarsFromDb;
const getUserCarsFromDb = (req, res) => {
    const { userID } = req.params;
    userSchema_1.default.findById(userID).populate("cars")
        .exec(function (err, user) {
        if (err)
            return res.status(500).send(`server problem - ${err}`);
        return res.status(200).send(user.cars);
    });
};
exports.getUserCarsFromDb = getUserCarsFromDb;
const addCarToDb = (req, res) => {
    const { userID } = req.params;
    const { car, car_model, car_model_year, img, price, car_color } = req.body;
    carsSchema_1.default.create({ car, car_model, car_model_year, img, price, car_color }, function (err, car) {
        if (err)
            return res.status(500).send(`server problem - ${err}`);
        userSchema_1.default.findById(userID, function (err, user) {
            if (err)
                return res.status(404).send(err);
            user.cars.push(car);
            user.save(function (err) {
                if (err)
                    return res.status(500).send(`server problem - ${err}`);
                return res.status(201).send(car);
            });
        });
    });
};
exports.addCarToDb = addCarToDb;
const editCarDataInDb = (req, res) => {
    const newCar = req.body;
    const { carID } = req.params;
    carsSchema_1.default.findByIdAndUpdate(carID, newCar, { new: true })
        .then(car => res.status(200).send(car))
        .catch(err => res.status(400).send(err));
};
exports.editCarDataInDb = editCarDataInDb;
const deleteCarFromDb = (req, res) => {
    const { userID, carID } = req.params;
    carsSchema_1.default.findByIdAndDelete(carID)
        .then(car => {
        deleteCarRefFromUser(userID, carID);
        res.status(200).send("Car object was deleted");
    })
        .catch(err => res.status(400).send(err));
};
exports.deleteCarFromDb = deleteCarFromDb;
const deleteCarRefFromUser = (userID, carID) => {
    userSchema_1.default.findById(userID, (err, user) => {
        let userData = Object.assign({}, user);
        const userCarsRef = userData._doc.cars;
        const updatedCarsRef = userCarsRef.filter((refID) => String(refID) !== carID);
        userData = Object.assign(Object.assign({}, userData._doc), { cars: updatedCarsRef });
        userSchema_1.default.findByIdAndUpdate(userID, userData)
            .then((result) => console.log("car ref was deleted"))
            .catch((err) => console.log(err));
    });
};

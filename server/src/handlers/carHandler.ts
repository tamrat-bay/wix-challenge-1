import { ICar } from "../models/carModel";
import { Request, Response } from "express";
import Cars from '../models/carsSchema'

// I created DB that contains mock cars info
const getCars = (req: Request, res: Response): void  => {
  //I use reverse to display the last object that was added first in the client
    Cars.find({}).then(cars => res.status(200).send(cars.reverse()))
   .catch(err => res.status(404).send(err))
};

const addCar = (req: Request, res: Response): void => {
   const { car,  car_model, car_model_year, img, price}: ICar = req.body;

   Cars.create({car,car_model, car_model_year, img, price})
   .then(car => res.status(201).send(car))
   .catch(err =>{console.log(err);
    res.status(500).send(`Server problem - ${err}`)})
};

const deleteCar = (req: Request, res: Response): void  => {
   const id: string = req.params.id;

   Cars.findByIdAndDelete(id)
   .then(car => res.status(200).send("Car object was deleted"))
   .catch(err => res.status(400).send(err))
};

const editCar = (req: Request, res: Response): void  => {
   const newCar: ICar = req.body;
   const id: string = req.params.id;

   Cars.findByIdAndUpdate(id, newCar, { new: true })
   .then(car => res.status(200).send(car))
   .catch(err => res.status(400).send(err))
};



export { getCars, addCar, deleteCar, editCar}
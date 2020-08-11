import { ICar } from "../models/carModel";
import { Request, Response } from "express";
import Cars from '../models/carsSchema'

// I created DB that contains mock cars info
const getCars = (req: Request, res: Response) => {
   return Cars.find({}).then(cars => res.status(200).send(cars))
   .catch(err => res.status(404).send(err))
};

const addCar = (req: Request, res: Response) => {
   const newCarObj: ICar = req.body;
   
   Cars.create(newCarObj)
   .then(car => res.status(201).send(car))
   .catch(err => res.status(500).send(`Server problem - ${err}`))
};

const deleteCar = (req: Request, res: Response) => {
   const id: string = req.params.id;

   Cars.findByIdAndDelete(id)
   .then(car => res.status(200).send("Car object was deleted"))
   .catch(err => res.status(400).send(err))
};

const editCar = (req: Request, res: Response) => {
   const newCar: ICar = req.body;
   const id: string = req.params.id;

   Cars.findByIdAndUpdate(id, newCar, { new: true })
   .then(car => res.status(200).send(car))
   .catch(err => res.status(400).send(err))
};



export { getCars, addCar, deleteCar, editCar}
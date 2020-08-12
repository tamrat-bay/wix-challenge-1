import { ICar } from "../models/carModel";
import { Request, Response, Router } from "express";
import Cars from '../models/carsSchema'

const router:Router = Router();

router.get('/', (req: Request, res: Response) => {
    Cars.find({}).then(cars => res.status(200).send(cars.reverse()))
    .catch(err => res.status(404).send(err))
})

router.post('/', (req: Request, res: Response) => {
    const { car,  car_model, car_model_year, img, price}: ICar = req.body;

    Cars.create({car,car_model, car_model_year, img, price})
    .then(car => res.status(201).send(car))
    .catch(err =>{console.log(err);
     res.status(500).send(`Server problem - ${err}`)})
})

router.put('/:id', (req: Request, res: Response) => {
    const newCar: ICar = req.body;
    const id: string = req.params.id;
 
    Cars.findByIdAndUpdate(id, newCar, { new: true })
    .then(car => res.status(200).send(car))
    .catch(err => res.status(400).send(err))
})

router.delete('/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;

    Cars.findByIdAndDelete(id)
    .then(car => res.status(200).send("Car object was deleted"))
    .catch(err => res.status(400).send(err))
})

export default router;
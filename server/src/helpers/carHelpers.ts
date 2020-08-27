import { Request, Response } from 'express';
import { ICar } from "../models/carModel";
import { IUser } from "../models/userModel";
import Cars from '../models/carsSchema'
import User from '../models/userSchema';

const getCarsFromDb = (req: Request, res: Response ) => {
    Cars.find({}).then(cars => res.status(200).send(cars.reverse()))
    .catch(err => res.status(404).send('Not found'))
}
const getUserCarsFromDb = (req: Request, res: Response ) => {
  const { userID } = req.params;
 
  User.findById(userID).populate("cars")
  .exec(function (err: any, user: IUser) {
    if (err) return res.status(500).send(`server problem - ${err}`);
    return res.status(200).send(user.cars);
});
}

const addCarToDb = (req: Request, res: Response ) => {
    const {userID}  = req.params;
    const { car, car_model, car_model_year, img, price, car_color }: ICar = req.body;
     
    Cars.create({car,car_model, car_model_year, img, price, car_color},
    function (err: any, car: ICar) {
      if (err)  return res.status(500).send(`server problem - ${err}`);
      User.findById( userID , function (err, user: IUser) {          
        if (err) return res.status(404).send(err);
        user.cars.push(car);
        user.save(function (err: any) {
          if (err) return res.status(500).send(`server problem - ${err}`);
          return res.status(201).send(car);
        });
      });
    })
}
const editCarDataInDb = (req: Request, res: Response ) => {
    const newCar: ICar = req.body;
    const { carID } = req.params;

    Cars.findByIdAndUpdate(carID, newCar, { new: true })
    .then(car => res.status(200).send(car))
    .catch(err => res.status(400).send(err))
}

const deleteCarFromDb = (req: Request, res: Response ) => {
    const { userID ,carID } = req.params;

    Cars.findByIdAndDelete(carID)
    .then(car => {
      deleteCarRefFromUser(userID,carID)
      res.status(200).send("Car object was deleted")
  })
    .catch(err => res.status(400).send(err))
}

const deleteCarRefFromUser = (userID: string, carID: string): void => {
  User.findById(userID, (err, user) => {
    let userData: any = { ...user };
    const userCarsRef: string[] = userData!._doc.cars;

    const updatedCarsRef = userCarsRef.filter(
      (refID: string) => String(refID) !== carID
    );
    userData = { ...userData!._doc, cars: updatedCarsRef };
    User.findByIdAndUpdate(userID, userData)
      .then((result) => console.log("car ref was deleted"))
      .catch((err) => console.log(err));
  });
};

export { getCarsFromDb, addCarToDb, deleteCarFromDb, editCarDataInDb, getUserCarsFromDb}
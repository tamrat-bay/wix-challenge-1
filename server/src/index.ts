import express, { Application, Request, Response } from "express";
import mongoose from 'mongoose';
import { getCars, addCar, deleteCar, editCar } from './handlers/carHandler'


const app: Application = express();
const Port: number | string = process.env.PORT || 5000;
app.use(express.json());

const mongoURI: string = "";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));
  
  

  
app.get("/cars", (req: Request, res: Response) => {
  return getCars(req, res)
});

app.post("/cars", (req: Request, res: Response) => {
  return addCar(req, res)
});

app.delete("/cars/:id", (req: Request, res: Response) => {
  return deleteCar(req, res)
});

app.put("/cars/:id", (req: Request, res: Response) => {
  return editCar(req, res)
});

app.listen(Port, () => console.log(`Server is listening on port ${Port}`));

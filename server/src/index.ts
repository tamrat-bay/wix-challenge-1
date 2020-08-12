import express, { Application } from "express";
import { config } from 'dotenv'
import mongoose from 'mongoose';
import carsRouter from './routes/cars'

const app: Application = express();
const Port: number | string = process.env.PORT || 5000;

app.use(express.json());
config()

const mongoURL: string = process.env.DB_URL || "localhost";

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));

app.use('/cars', carsRouter )

  
app.listen(Port, () => console.log(`Server is listening on port ${Port}`));

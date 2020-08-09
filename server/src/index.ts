import express, { Application, Request, Response } from "express";
import axios from "axios";
import { ICars } from "./models/carsModel";

const app: Application = express();
const Port: number | string = process.env.PORT || 5000;

app.get("/cars", (req: Request, res: Response) => {
  return axios
    .get("https://myfakeapi.com/api/cars")
    .then((response) => {
      if (response.status === 200) {
          const carsData : ICars[] = response.data
        return res.status(200).send(carsData);
      }
    })
    .catch((err) => res.status(400).send(err));
});

app.listen(Port, () => console.log(`Server is listening on port ${Port}`));

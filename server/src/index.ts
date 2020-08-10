import express, { Application, Request, Response } from "express";
import { getCars } from './handlers/carHandler'

const app: Application = express();
const Port: number | string = process.env.PORT || 5000;

app.get("/cars", (req: Request, res: Response) => {
  return getCars(req, res)
});

app.listen(Port, () => console.log(`Server is listening on port ${Port}`));

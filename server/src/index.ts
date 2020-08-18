import express, { Application, Request, Response } from "express";
import mongoose from 'mongoose';
import path from 'path'
import { config } from 'dotenv'
import carsRouter from './routes/carsRouter'
import usersRouter from './routes/usersRouter'

const app: Application = express();
const Port: number | string = process.env.PORT || 5000;

app.use(express.json());
config();

const mongoURL: string = process.env.DB_URL || "localhost"

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use('/cars', carsRouter );
app.use('/users', usersRouter );

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "..", "client", "build");
  app.use(express.static(buildPath));
  // --- handle unknown route
  app.get("*", (req: Request, res: Response) => {
    const indexHtmlPath = path.join(buildPath, "index.html");
    res.sendFile(indexHtmlPath);
  });
} else {
  console.log("Development Mode");
}

  
app.listen(Port, () => console.log(`Server is listening on port ${Port}`));

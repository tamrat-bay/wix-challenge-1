import express, { Application, Request, Response } from "express";
import mongoose from 'mongoose';
import path from 'path'
import carsRouter from './routes/carsRouter'

const app: Application = express();
const Port: number | string = process.env.PORT || 5000;

app.use(express.json());

const mongoURL: string = "mongodb+srv://tamrat:87654321@mybudget-ajn0y.mongodb.net/wix-cars?retryWrites=true&w=majority"

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use('/cars', carsRouter )

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "..", "client", "build");
  app.use(express.static(buildPath));
  // --- handle unknown route
  app.get("*", (req: Request, res: Response) => {
    const indexHtmlPath = path.join(buildPath, "index.html");
    res.sendFile(indexHtmlPath);
  });
} else {
  console.log("Development mode");
}

  
app.listen(Port, () => console.log(`Server is listening on port ${Port}`));

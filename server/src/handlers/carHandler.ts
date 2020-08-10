import { ICar } from "../models/carModel";
import { Request, Response } from "express";
import { mockCarsImages } from './carsImagesArray'
import axios from "axios";

// The API doesn't have images thats why i created this function to add img key to each car obj 
const addImgToCarObj = (carsArray : ICar[], imagesArray:string[]) : ICar[] => {
   const carsWithImages: ICar[] = carsArray.map((car:ICar, i:number) => { return {...car, img:imagesArray[i] }} ) 
   return carsWithImages; 
}

const getCars = (req: Request, res: Response) => {
   return axios
    .get("https://myfakeapi.com/api/cars")
    .then((response) => {
      if (response.status === 200) {
          const carsData : ICar[] = response.data.cars.slice(0, 50)
          const carsWithImages = addImgToCarObj(carsData,mockCarsImages)
        return res.status(200).send(carsWithImages);
      }
    })
    .catch((err) => res.status(400).send(err));
  };


export { getCars }
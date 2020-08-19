import { ICar } from './carModel';

export interface IUser {
    name: string;
    email: string;
    password: string;
    authType: string;
    token: string;
    cars: ICar[];
    _id:string;
    [x: string]: any; // allows save method via mongoose
  }
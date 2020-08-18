import { ICar } from './carModel';

export interface IUserModel {
    name: string;
    email: string;
    password: string;
    authType: string;
    cars: ICar[];
    _id:string;
  }
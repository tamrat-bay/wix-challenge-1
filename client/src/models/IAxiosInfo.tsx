import  { ICar } from './ICar';

export interface IAxiosInfo {
    method: string;
    url: string;
    requestFunction: (newData: ICar) => void;
}
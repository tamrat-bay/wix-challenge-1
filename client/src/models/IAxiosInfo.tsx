import  { ICar } from './ICar';

export interface IAxiosInfo {
    method: string;
    url: string;
    methodFunction: (newData: ICar) => void;
}
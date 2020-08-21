import  { ICar } from './ICar';

export interface IServerRequestsInfo {
    url: string;
    responseFunction: (cars: ICar[], newData: ICar, id: string | null  ) => ICar[];
}
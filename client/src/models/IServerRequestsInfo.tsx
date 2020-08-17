import  { ICar } from './ICar';

export interface IServerRequestsInfo {
    url: string;
    requestFunction: (cars: ICar[], newData: ICar, id: string | null  ) => ICar[];
}
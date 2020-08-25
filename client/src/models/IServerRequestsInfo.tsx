import  { ICar } from './ICar';

export interface IServerRequestsInfo {
    urlBuilder:(authType:string,id:string) => string;
    responseHandler: (cars: ICar[], newData: ICar, id: string | null  ) => ICar[];
}
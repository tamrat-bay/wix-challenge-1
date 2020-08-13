import  { ICar } from './ICar';
import { Method } from 'axios';

export interface IServerRequestsInfo {
    method: string | Method;
    url: string;
    requestFunction: (newData: ICar) => void;
}
export interface ICar {
    _id: string;
    id?: number;
    car: string;
    car_model: string;
    car_color: string;
    car_model_year: number | string;
    car_vin?: string;
    price: number | string;
    img: string;
    availability?: Boolean;
  }
  
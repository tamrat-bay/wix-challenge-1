import { ICar } from "../../models/ICar";

const filterCarsByBrand = (brand: string, cars: ICar[]): ICar[] => {
    const filteredCars: ICar[] = cars.filter(
      (car: ICar) => car.car.toLowerCase() === brand.toLowerCase());
    return filteredCars;
  };

const filterCarsByYears = (years: number[], cars: ICar[]): ICar[] => {
    const filteredCars: ICar[] = cars.filter(
      (car: ICar) => years[0] <= car.car_model_year && years[1] >= car.car_model_year);
    return filteredCars;
  };

const filterCarsByBrandAndYears = (brand: string, years: number[], cars: ICar[]): ICar[]  => {
    const filteredByBrand: ICar[] = filterCarsByBrand(brand, cars);
    const filteredByBrandAndYears: ICar[] = filterCarsByYears(years,filteredByBrand);
    return filteredByBrandAndYears;
};

const sortCarsByPricesLowToHigh = (cars: ICar[]): ICar[] => {
  //Slicing the first Char which is $ sign to get only numbers
  const sortedByPrice = cars.sort(
    (carA, carB) =>
      Number(carA.price.slice(1, carA.price.length)) -
      Number(carB.price.slice(1, carB.price.length))
  );
  return sortedByPrice;
};

const sortCarsByPricesHighToLow = (cars: ICar[]): ICar[] => {
  //Slicing the first Char which is $ sign to get only numbers
  const sortedByPrice = cars.sort(
    (carA, carB) =>
      Number(carB.price.slice(1, carB.price.length)) -
      Number(carA.price.slice(1, carB.price.length))
  );
  return sortedByPrice;
};

const sortCarsByNewestYear = (cars: ICar[]): ICar[]  => {
    const sortedByYears =  cars.sort((carA, carB) => Number(carB.car_model_year) - Number(carA.car_model_year))
    return sortedByYears;
};



export {
  filterCarsByBrand,
  filterCarsByYears,
  filterCarsByBrandAndYears,
  sortCarsByPricesLowToHigh,
  sortCarsByPricesHighToLow,
  sortCarsByNewestYear,
};
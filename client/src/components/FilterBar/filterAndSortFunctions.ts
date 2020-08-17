import { ICar } from "../../models/ICar";

const filterCarsByBrand = (brand: string, cars: ICar[]): ICar[] => {
  const filteredCars: ICar[] = cars.filter(
    (car: ICar) => car.car.toLowerCase() === brand.toLowerCase()
  );
  return filteredCars;
};

const filterCarsByYears = (years: number[], cars: ICar[]): ICar[] => {
  const filteredCars: ICar[] = cars.filter(
    (car: ICar) =>
      years[0] <= car.car_model_year && years[1] >= car.car_model_year
  );
  return filteredCars;
};

const filterCarsByBrandAndYears = (
  brand: string,
  years: number[],
  cars: ICar[]
): ICar[] => {
  const filteredByBrand: ICar[] = filterCarsByBrand(brand, cars);
  const filteredByBrandAndYears: ICar[] = filterCarsByYears(
    years,
    filteredByBrand
  );
  return filteredByBrandAndYears;
};

const sortCarsByPricesLowToHigh = (cars: ICar[]): ICar[] => {
  const sortedByPrice = cars.sort((carA, carB) => (carA.price as number) - (carB.price as number));
  return sortedByPrice;
};

const sortCarsByPricesHighToLow = (cars: ICar[]): ICar[] => {
  const sortedByPrice = cars.sort((carA, carB) => (carB.price as number) - (carA.price  as numbe));
  return sortedByPrice;
};

const sortCarsByNewestYear = (cars: ICar[]): ICar[] => {
  const sortedByYears = cars.sort(
    (carA, carB) => Number(carB.car_model_year) - Number(carA.car_model_year)
  );
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

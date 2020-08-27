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
const filterCarsByPrices = (prices: number[], cars: ICar[]): ICar[] => {
  const filteredCars: ICar[] = cars.filter(
    (car: ICar) =>
     prices[0] <= car.price && prices[1] >= car.price
  );  
  return filteredCars;
};

const filterCarsByPricesAndYears =   (prices: number[],years: number[], cars: ICar[])  => {
   const filteredByYears =  filterCarsByYears(years,cars);
   const filteredByYearsAndPrices =  filterCarsByPrices(prices,filteredByYears)
   return filteredByYearsAndPrices
}

const filterCarsByBrandYearsAndPrices =  (
  brand: string,
  years: number[],
  prices: number[],
  cars: ICar[]
)=> {
  const filteredByBrand: ICar[] = filterCarsByBrand(brand, cars);
  const filteredByBrandAndYears =  filterCarsByYears(
    years,
    filteredByBrand
  );
  const filteredByBrandYearsAndPrices =  filterCarsByPrices(prices,filteredByBrandAndYears)
  return filteredByBrandYearsAndPrices;
};

const sortCarsByPricesLowToHigh = (cars: ICar[]): ICar[] => {
  const sortedByPrice = cars.sort((carA, carB) => (carA.price as number) - (carB.price as number));
  return sortedByPrice;
};

const sortCarsByPricesHighToLow = (cars: ICar[]): ICar[] => {
  const sortedByPrice = cars.sort((carA, carB) => (carB.price as number) - (carA.price  as number));
  return sortedByPrice;
};

const sortCarsByNewestYear = (cars: ICar[]): ICar[] => {
  const sortedByYears = cars.sort(
    (carA, carB) => Number(carB.car_model_year) - Number(carA.car_model_year)
  );
  return sortedByYears;
};

const getUniqueBrandNames = (cars: ICar[]): string[] => {
  const brandNames = [...new Set(cars.map(c => c.car.toUpperCase()))]
  return brandNames;
};

export {
  filterCarsByBrandYearsAndPrices,
  sortCarsByPricesLowToHigh,
  sortCarsByPricesHighToLow,
  sortCarsByNewestYear,
  getUniqueBrandNames,
  filterCarsByPricesAndYears
};

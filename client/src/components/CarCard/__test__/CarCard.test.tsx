import React from "react";
import ReactDom from "react-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarCard from "../CarCard";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <CarCard
      car={{
        _id: "",
        car: "",
        car_model: "",
        car_model_year: "",
        img: "",
        price: "",
      }}
      deleteCar={jest.fn}
      setEditCarFlag={jest.fn}
      setSelectedCar={jest.fn}
    />,
    div
  );
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <CarCard
      car={{
        _id: "",
        car: "",
        car_model: "",
        car_model_year: "",
        img: "",
        price: "",
      }}
      deleteCar={jest.fn}
      setEditCarFlag={jest.fn}
      setSelectedCar={jest.fn}
    />
  );
  expect(getByTestId("car-card")).toBeTruthy();
});

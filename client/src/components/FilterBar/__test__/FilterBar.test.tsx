import React from "react";
import ReactDom from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
afterEach(cleanup);

import FilterBar from "../FilterBar";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <FilterBar
      cars={[
        {
          _id: "",
          car: "",
          car_model: "",
          car_model_year: "",
          img: "",
          price: "",
        },
      ]}
      setFilterFlag={jest.fn}
      setFilteredCars={jest.fn}
    />,
    div
  );
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <FilterBar
      cars={[
        {
          _id: "",
          car: "",
          car_model: "",
          car_model_year: "",
          img: "",
          price: "",
        },
      ]}
      setFilterFlag={jest.fn}
      setFilteredCars={jest.fn}
    />
  );
  expect(getByTestId("filter-bar")).toBeTruthy();
});

describe("Input value", () => {
  it("Update on change", () => {
    const { getAllByTestId } = render(
      <FilterBar
        cars={[
          {
            _id: "",
            car: "",
            car_model: "",
            car_model_year: "",
            img: "",
            price: "",
          },
        ]}
        setFilterFlag={jest.fn}
        setFilteredCars={jest.fn}
      />
    );

    const inputs = getAllByTestId("filter-bar-input") as HTMLInputElement[];

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: "test" } });
      setTimeout(() => {
        expect(input.value).toBe("test");
      }, 500);
    });
  });
});

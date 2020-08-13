import React from "react";
import ReactDom from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

import CarForm from "../CarForm";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <CarForm
      closeWindow={jest.fn}
      axiosInfo={{ method: "post", url: "/cars", requestFunction: jest.fn }}
      initialValues={{
        _id: "1",
        car: "toyota",
        car_model: "corolla",
        car_model_year: "2014",
        price: "2000",
        img: "/corolla.png",
      }}
    />,
    div
  );
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <CarForm
      closeWindow={jest.fn}
      axiosInfo={{ method: "post", url: "/cars", requestFunction: jest.fn }}
      initialValues={{
        _id: "1",
        car: "toyota",
        car_model: "corolla",
        car_model_year: "2014",
        price: "2000",
        img: "/corolla.png",
      }}
    />
  );
  expect(getByTestId("car-form")).toBeTruthy();
});

describe("Input value", () => {
  it("Update on change", () => {
    const { getAllByTestId } = render(
      <CarForm
        closeWindow={jest.fn}
        axiosInfo={{ method: "post", url: "/cars", requestFunction: jest.fn }}
        initialValues={{
          _id: "1",
          car: "toyota",
          car_model: "corolla",
          car_model_year: "2014",
          price: "2000",
          img: "/corolla.png",
        }}
      />
    );

    const inputs = getAllByTestId("car-form-input") as HTMLInputElement[];

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: "test" } });

      setTimeout(() => {
        expect(input.value).toBe("test");
      }, 700);
    });
  });
});


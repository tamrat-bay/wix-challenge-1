import React from "react";
import ReactDom from "react-dom";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditCar from "../EditCar";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <EditCar
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
      selectedCar={{
        _id: "",
        car: "",
        car_model: "",
        car_model_year: "",
        img: "",
        price: "",
      }}
      setEditCarFlag={jest.fn}
      setCars={jest.fn}
    />,
    div
  );
});

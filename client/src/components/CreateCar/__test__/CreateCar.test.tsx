import React from "react";
import ReactDom from "react-dom";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateCar from "../CreateCar";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <CreateCar
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
      setAddCarFlag={jest.fn}
      setCars={jest.fn}
    />,
    div
  );
});


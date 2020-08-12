import React from "react";
import ReactDom from "react-dom";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../Navbar";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <Navbar />,
    div
  );
});

it("renders correctly", () => {
    const {getByTestId } = render(<Navbar />)
    expect(getByTestId('navbar')).toBeTruthy()
})

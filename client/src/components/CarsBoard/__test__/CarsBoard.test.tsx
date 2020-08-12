import React from 'react';
import ReactDom from 'react-dom';
import { render,cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CarsBoard from '../CarsBoard';

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<CarsBoard />, div)
})

it("renders correctly", () => {
    const {getByTestId } = render(<CarsBoard />)
    expect(getByTestId('cars-board')).toBeTruthy()
})

describe("Add New Car button click", () =>{
     it("renders CarForm on button click", () =>{
        const {getByText,getByTestId } = render(<CarsBoard />)
        const addNewCarButton = getByText("Add New Car");
        fireEvent.click(addNewCarButton)

        expect(getByTestId('car-form')).toBeTruthy()

        fireEvent.click(addNewCarButton)

        setTimeout(()=>{
                expect(getByTestId('car-form')).toBeFalsy()
        },1000)
        
     })

})


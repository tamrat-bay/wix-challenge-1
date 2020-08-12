import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders correctly', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('app')).toBeTruthy();
});

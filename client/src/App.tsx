import React from 'react';
import './App.css';
import CarsBoard from './components/CarsBoard/CarsBoard';

const App: React.FC = () => {
  return (
    <div data-testid="app" className="App">
        <CarsBoard />
    </div>
  );
}

export default App;

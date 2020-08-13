import React from 'react';
import './App.css';
import CarsBoard from './components/CarsBoard/CarsBoard';
import Navbar from './components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <div data-testid="app" className="App">
        <Navbar />
        <CarsBoard />
    </div>
  );
}

export default App;

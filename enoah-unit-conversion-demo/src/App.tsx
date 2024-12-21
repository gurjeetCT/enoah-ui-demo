import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UnitConverter from './components/UnitConverter'
import UnitType from './components/UnitType';
import UnitDetails from './components/UnitDetails';
import { Navbar } from "./NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import ConversionHistory from './components/ConversionHistory';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar/>        
          <Routes>
            <Route path="/" element={<UnitType />} />
            <Route path="/addUnitDetails" element={<UnitDetails />} />
            <Route path="/convert" element={<UnitConverter />} />            
            <Route path="/history" element={<ConversionHistory />} />            
          </Routes>        
      </div>
    </Router>
  );
}

export default App;

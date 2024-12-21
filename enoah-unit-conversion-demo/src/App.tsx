import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UnitConverter from './components/UnitConverter'
import UnitType from './components/UnitType';
import UnitDetails from './components/UnitDetails';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Unit Types</Link>
            </li>
            <li>
              <Link to="/addUnitDetails">Set Unit Details</Link>
            </li>
            <li>
              <Link to="/convert">Convert Units</Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<UnitType />} />
            <Route path="/addUnitDetails" element={<UnitDetails />} />
            <Route path="/convert" element={<UnitConverter />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

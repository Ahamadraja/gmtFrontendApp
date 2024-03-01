// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/country/:alpha3Code" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

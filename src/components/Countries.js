// Countries.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/all`
        );
        
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const filteredByRegion =
    region !== ''
      ? filteredCountries.filter((country) =>
          country.region.toLowerCase().includes(region.toLowerCase())
        )
      : filteredCountries;

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={handleChange}
      />
      <select onChange={handleRegionChange}>
        <option value="">Filter by Region</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
      <div>
        {filteredByRegion.map((country) => (
          <Link key={country.cca3} to={`/country/${country.cca3}`}>
            <div>
              <h3>{country.name.common}</h3>
              <p>Region: {country.region}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Countries;

// CountryDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CountryDetail = () => {
  const [country, setCountry] = useState({});
  const { alpha3Code } = useParams();
  const [loading , setloading]=useState(false)

  useEffect(() => {
    const fetchCountry = async () => {
        setloading(true)
      try {
        
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${alpha3Code}`
        );
        console.log("jhg",response?.data?.country)
        setCountry(response?.data);
      } catch (error) {
        console.error('Error fetching country: ', error);
      }finally{
        setloading(false)
      }
    };
    fetchCountry();
  }, [alpha3Code]);

  return (
    <div>
        {
            loading && <>
            <h1>
                Loading....
            </h1>
            </>
        }
      {!loading && country && (
        <div>
          <h2>{country[0]?.name?.common}</h2>
          <p>Capital: {country[0]?.capital}</p>
          <p>Region: {country[0]?.region}</p>
          <p>Population: {country[0]?.population}</p>
          <p>Area: {country[0]?.area} sq. km</p>
          <h3>Border Countries:</h3>
          {country[0]?.borders?.map((border) => (
            <Link key={border} to={`/country/${border}`}>
              {border}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryDetail;

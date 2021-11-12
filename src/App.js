// import React from 'react';
// import { fetchWeather } from './api/fetchWeather';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAction } from './redux/slices/weatherSlices';
import './App.css';

//display icon https://openweathermap.org/img/wn/${icon}.png
function App(props) {

  const [city, setCity] = useState('Kyiv');
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(fetchWeatherAction('kyiv'));
  },[]);

  const state = useSelector((state) => state);
  const { weather, loading, error, cities} = state;
 
  console.log(state);
  console.log(cities);

  return (
    <div>
      <section className="main-container">
        <div className="search-form">
          <h2 className="app-title">
            Weather App
          </h2>
          <p className="app-slogаn">
            Find out the current weather situation around the world
          </p>

          {/* Input */}
          <input
            // value = {city}
            onChange={e => setCity(e.target.value)}
            placeholder="Search City"
            className="search"
          ></input>

          {/* Button */}
          <button
            onClick = {() => dispatch(fetchWeatherAction(city))}
            type="button"
            className="button btn-green"
          >
            <img class="icon" src="icon-search.png" alt="" />
            Search
          </button>
        </div>

        {/* Content goes here */}
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                <div className="city">
                  <h3 className="city-name">
                    <p >{weather?.name}, {weather?.sys?.country}</p>
                  </h3>
                  <span className="">
                    {/* weather logo */}
                    <img
                        className=""
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                        alt="/"
                      />
                  </span>
                  <p className="conditions">
                    {weather?.weather[0].main}
                  </p>
                  <p className="city-temp">
                  {Math.ceil(Number(weather?.main.temp))}{" "}
                  <span className="">°C</span>
                  </p>
                  <p className="text">
                  The weather condition in {weather?.name},{" "}
                    {weather?.sys?.country} is described as :{" "}
                    {weather?.weather[0].description} with a temperature of{" "}
                    {Math.ceil(Number(weather?.main.temp))} °C and a humidity of{" "}
                    {weather?.main?.humidity} %
                </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}

     <div className="list main-container ">
      <p>You searched earlier:</p>
      <ol className="rectangle">
        {
          cities ? (Object.keys(cities).map(key => 
            <li key={key} onClick = {() => dispatch(fetchWeatherAction(cities[key]))}><a> {cities[key]} </a> </li> )) : "None"
        }
      </ol>
        
      </div>  
    </div>

  );
}

export default App;
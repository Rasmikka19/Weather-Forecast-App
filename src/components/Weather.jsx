import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiStrongWind } from "react-icons/wi";
import { BiSearchAlt } from "react-icons/bi";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "431f76d6c5b32c9213215a794695b293"; 

//   Weather Icons
  const getIcon = (main) => {
    switch (main) {
      case "Clouds": return <WiCloudy className="text-6xl text-white" />;
      case "Rain": return <WiRain className="text-6xl text-blue-500" />;
      case "Snow": return <WiSnow className="text-6xl text-blue-100" />;
      case "Wind": return <WiStrongWind className="text-6xl text-white" />;
      default: return <WiDaySunny className="text-6xl text-yellow-300" />;
    }
  };

  const getWeather = async () => {
    if (!city) {
      setError("Enter a city name!");
      return;
    }

    try {
      setError("");
      setWeather(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=431f76d6c5b32c9213215a794695b293&units=metric`;

      const response = await axios.get(url);
      setWeather(response.data);
    } catch {
      setError("City not found. Try again.");
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      
      {/* Search Box */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search city , state , country"
          className="flex-grow px-4 py-3 rounded-xl text-white placeholder-white/70 bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeather}
          className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition duration-300 shadow-md"
        >
          <BiSearchAlt size={26} /> {/* Search Bar Icon */}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mb-4 animate-slide-in">
          {error}
        </p>
      )}

      {/* Weather Details */}
      {weather && (
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-3">
            {getIcon(weather.weather[0].main)} {/* Weather Path */}
          </div>

          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {weather.name}, {weather.sys.country} {/* Weather Name, Country Name */}
          </h2>

          <p className="text-6xl font-extrabold text-white my-2 drop-shadow-lg">
            {Math.round(weather.main.temp)}°C {/* Temperature*/}
          </p>

          <p className="text-xl text-white/90 mb-4 capitalize">
            {weather.weather[0].description} {/* Description */}
          </p>

          <div className="grid grid-cols-2 gap-4 text-white/90 text-lg">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm shadow-md">
              <p className="font-semibold">Humidity</p>
              <p>{weather.main.humidity}%</p> {/* Humidity*/}
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm shadow-md">
              <p className="font-semibold">Wind</p>
              <p>{weather.wind.speed} m/s</p> {/* Wind Speed */}
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm shadow-md">
              <p className="font-semibold">Feels Like</p>
              <p>{weather.main.feels_like} °C</p> {/* Feels Like */}
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm shadow-md">
              <p className="font-semibold">Visibility</p>
              <p>{weather.visibility} km</p> {/* Visibility */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
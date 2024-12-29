import { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_WEATHER_API_URL}&q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="weather-widget">
      <h2>Weather Widget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <div>Loading weather data...</div>}
      {error && <div>{error}</div>}
      {weather && (
        <div className="weather-info">
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Condition: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
import React,{ useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [city, setCity] = useState("Kochi"); // Default city set to "Kakkanad"
  const [weatherData, setWeatherData] = useState(null); // for weather data storage
  const [error, setError] = useState("");

  const apiKey = "8ac5c4d57ba6a4b3dfcf622700447b1e"; // Your OpenWeatherMap API Key

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError(""); // Clear previous errors
      } else {
        setError("City not found. Please try another city.");
        setWeatherData(null);
      }
    } catch (error) {
      setError("Error fetching data.");
      setWeatherData(null);
    }
  };

  // Fetch weather data when the component mounts
  React.useEffect(() => {
    fetchWeather();
  }, [city]); // Call fetchWeather when city changes

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchWeather();
  };

  return (
    <div className="app">
      <div className="weather-container">
        <h1>Weather App</h1>
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p className="temperature">🌡️ {weatherData.main.temp}°C</p>
            <p>{weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
            <p>Feels Like: {weatherData.main.feels_like}°C</p>
            <p> Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Visibility: {weatherData.visibility / 1000} km</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
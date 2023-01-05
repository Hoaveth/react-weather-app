import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import "./App.css";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import Search from "./components/Search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(",");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const currentForecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, currentForecastFetch]).then(
      async (response) => {
        console.log(response.json);
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        console.log(forecastResponse);
        setCurrentWeather(weatherResponse);
        setCurrentForecast(forecastResponse);
      }
    );
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && (
        <CurrentWeather data={currentWeather} forecast={currentForecast} />
      )}

      {currentForecast && <Forecast data={currentForecast} />}
    </div>
  );
}

export default App;

import { apiKey, coordinates } from "./constants";
import { checkResponse } from "./api";

function getWeatherCondition(tempF) {
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}

function getTimeOfDay(sunrise, sunset) {
  const now = Date.now() / 1000; // ms → seconds
  return now >= sunrise && now < sunset ? "day" : "night";
}

function getWeatherType(weatherMain) {
  if (weatherMain === "Clear") return "sunny";
  if (weatherMain === "Clouds") return "cloudy";
  if (weatherMain === "Rain") return "rain";
  if (weatherMain === "Snow") return "snow";
  return "fog";
}

function filterWeatherData(data) {
  const tempF = Math.round(data.main.temp);
  const temperature = {
    F: tempF,
    C: Math.round((tempF - 32) * (5 / 9)),
  };
  const location = data.name;
  const type = getWeatherCondition(tempF);

  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const timeOfDay = getTimeOfDay(sunrise, sunset);

  const weatherMain = data.weather[0].main;
  const weatherType = getWeatherType(weatherMain);

  return { temperature, location, type, timeOfDay, weatherType };
}

function getWeather() {
  const { latitude, longitude } = coordinates;

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  )
    .then(checkResponse)
    .then(filterWeatherData);
}

export { getWeather, getWeatherCondition, getTimeOfDay, getWeatherType };

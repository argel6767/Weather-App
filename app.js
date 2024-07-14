

const weatherAPI = "API";

const listOfCities = [];


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("city-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = document.getElementById("city-input");
      if (input) {
        const cityInput = input.value;
        if (!containsCity(cityInput)) {
        const API_URL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${cityInput}`;
        const weatherData = await fetchWeatherData(API_URL);
        addWeatherData(weatherData, cityInput);
        listOfCities.push(cityInput);
        }
        else {
          alert("City already on screen!");
        }
      } else {
        console.error('Input element not found.');
      }
    });
  } else {
    console.error('Form element not found.');
  }
});


const fetchWeatherData = async (url) => {
  try {
    const response  = await fetch(url);
  if (!response.ok) {
    throw new Error("Fetch request failed " + response.statusText);
  }
  const data = await response.json();
  console.log(data);
  return data;
  }
  catch(error) {
    console.log(error);
    msg.textContent = "Please choose a valid city!"
  }
}

const addWeatherData = async (weatherData, city) => {
  const citiesList = document.querySelector(".ajax-section .cities");
  const newCityWeather = document.createElement("li");
  feelsLike = await weatherData.current.feelslike_f;
  correctIcon = await correctTime(weatherData);
  const weatherIconHTML = `<div class="weather-container">
  <p>${capitalizeFirstLetter(city)} feels like: ${feelsLike}</p>
  ${correctIcon}</div>`
  newCityWeather.innerHTML = weatherIconHTML;
  citiesList.appendChild(newCityWeather);
}

const correctTime = async (weatherData) => {
  const cityTime = await weatherData.location.localtime;
  const actualTime = cityTime.split(" ")[1];
  const hour = parseInt(actualTime.split(":")[0],10);

  if (hour > 6 && hour < 20) {
    return `<img src="assets/sun.png"/>`
  }
  else {
    return `<img src="assets/moon.png"/>`
  }
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const containsCity = (city) => {
   return listOfCities.includes(city);
}








const weatherAPI = "API";

const listOfCities = [];


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("city-form");

  if (form) {
    //submit listener
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = document.getElementById("city-input");
      if (input) {
        //grabs input from input element
        const cityInput = input.value;
        
        //checks if city is already in list
        if (!containsCity(cityInput)) {
        //if so fetches data
        const API_URL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${cityInput}`;
        const weatherData = await fetchWeatherData(API_URL);
        //creates li element
        addWeatherData(weatherData, cityInput);
        //push city to list
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


//fetch data from WeatherAPI
const fetchWeatherData = async (url) => {
  try {
    const response  = await fetch(url);
  if (!response.ok) {
    throw new Error("Fetch request failed " + response.statusText);
  }
  const data = await response.json();
  return data;
  }
  //if non valid city is given
  catch(error) {
    console.log(error);
    alert("Please choose a valid city!");
  }
}

//adds weather info for city to page
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

//puts correct image for weather 
const correctTime = async (weatherData) => {
  const cityTime = await weatherData.location.localtime;
  const actualTime = cityTime.split(" ")[1];
  const hour = parseInt(actualTime.split(":")[0],10);

  //checks hour of location
  if (hour > 6 && hour < 20) {
    return `<img src="assets/sun.png"/>`
  }
  else {
    return `<img src="assets/moon.png"/>`
  }
}

//capitalizes input for weather info
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//checks if city is already on screen by checking list values
const containsCity = (city) => {
   return listOfCities.includes(city);
}






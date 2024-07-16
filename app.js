const weatherAPI = "";

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
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${weatherAPI}&q=${cityInput}`;
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
  console.log(data)
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
  const weatherObject = await weatherData;
  const currTemp = weatherObject.current.temp_f;
  feelsLike = weatherObject.current.feelslike_f;
  correctIcon = correctTime(weatherObject);
  const humidity = weatherObject.current.humidity;
  const windSpeed = weatherObject.current.wind_mph;
  const rainChance = weatherObject.forecast.forecastday[0].day.daily_chance_of_rain;
  const weatherIconHTML = `<div class="weather-container">
  <h2 id="city-name">${capitalizeFirstLetter(city)}</h2>
  ${correctIcon}
  <h3>${currTemp}&deg; F</h3>
  <p id="feels-like">feels like: ${feelsLike}</p>
  <div id="bottom-section">
    <div class="bottom-section-third"><p>Humidity</p>
    <p>${humidity}%</p></div>
    <div class="bottom-section-third"><p>Wind</p>
    <p>${windSpeed} mph</p></div>
    <div class="bottom-section-third"><p>Precipitation</p>
    <p>${rainChance}%</p></div>
  </div>
  </div>`
  newCityWeather.innerHTML = weatherIconHTML;
  citiesList.appendChild(newCityWeather);
}

//puts correct image for weather 
const correctTime = (weatherData) => {
  const cityTime = weatherData.location.localtime;
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






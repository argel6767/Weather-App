

weatherAPI = "API_KEY";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("city-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = document.getElementById("city-input");
      if (input) {
        const cityInput = input.value;
        const API_URL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${cityInput}`;
        const weatherData = await fetchWeatherData(API_URL);
        addWeatherData(weatherData, cityInput);
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
    return "<img src=assets/7477790.png />"
  }
  else {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-2{fill:#e2e2e2}.cls-4{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}.cls-7{mix-blend-mode:overlay;fill:#fff}</style></defs><g style="isolation:isolate"><g id="Layer_1" data-name="Layer 1"><g id="Vector"><path class="cls-2" d="M41.37 62.29a1.49 1.49 0 0 1-1.28.68H11.3a1.55 1.55 0 0 1-1.3-.72A6.1 6.1 0 0 1 9.07 59a5.83 5.83 0 0 1 .1-1.12 6.12 6.12 0 0 1 6-5 6.14 6.14 0 0 1 1.92-4.45c.15-.14.32-.29.49-.42a6.15 6.15 0 0 1 3.74-1.26 6.93 6.93 0 0 1 1.31.13 5.82 5.82 0 0 1 .95.29 6.15 6.15 0 0 1 3.66 4A5.57 5.57 0 0 1 29 51a5.94 5.94 0 0 1 4.17 1.69 7.15 7.15 0 0 1 .76.89 6 6 0 0 1 2.42-.58 6.12 6.12 0 0 1 2.63.61 5.88 5.88 0 0 1 2.19 1.83 5.63 5.63 0 0 1 1.07 2.43 6.57 6.57 0 0 1-.87 4.42zM47.71 16.57a1.53 1.53 0 0 1-1.29.68H29.9a22.34 22.34 0 0 1 1.56-4.72 21.93 21.93 0 0 0-10.52 4.72h-3.31a1.56 1.56 0 0 1-1.33-.72 6.28 6.28 0 0 1-.9-3.22 5.28 5.28 0 0 1 .11-1.13 6.1 6.1 0 0 1 6-5A6.16 6.16 0 0 1 27.68 1a7.21 7.21 0 0 1 1.32.17 7.79 7.79 0 0 1 .94.28 6.16 6.16 0 0 1 3.66 4.07 5.57 5.57 0 0 1 1.69-.24A5.88 5.88 0 0 1 39.45 7a5.47 5.47 0 0 1 .77.89 6 6 0 0 1 5.09.07 6 6 0 0 1 3.25 4.26 6.46 6.46 0 0 1-.85 4.35z"/><path d="M54.93 43.58a22.08 22.08 0 0 1-13.76 11.9A5.88 5.88 0 0 0 39 53.65a6.12 6.12 0 0 0-2.65-.65 6 6 0 0 0-2.46.53 7.15 7.15 0 0 0-.76-.89A5.94 5.94 0 0 0 29 51a5.57 5.57 0 0 0-1.69.24 6.15 6.15 0 0 0-3.66-4 5.82 5.82 0 0 0-.95-.29 6.93 6.93 0 0 0-1.31-.13A6.15 6.15 0 0 0 17.61 48a22.06 22.06 0 0 1 13.85-35.46 22.34 22.34 0 0 0-1.56 4.72 22.06 22.06 0 0 0 21.58 26.59 23 23 0 0 0 3.45-.27z" style="fill:#fb0"/></g><g id="Line"><path class="cls-4" d="M41.37 62.29a1.49 1.49 0 0 1-1.28.68H11.3a1.55 1.55 0 0 1-1.3-.72A6.1 6.1 0 0 1 9.07 59a5.83 5.83 0 0 1 .1-1.12 6.12 6.12 0 0 1 6-5 6.14 6.14 0 0 1 1.92-4.45c.15-.14.32-.29.49-.42a6.15 6.15 0 0 1 3.74-1.26 6.93 6.93 0 0 1 1.31.13h0a5.82 5.82 0 0 1 .95.29 6.15 6.15 0 0 1 3.66 4A5.57 5.57 0 0 1 29 51a5.94 5.94 0 0 1 4.17 1.69 7.15 7.15 0 0 1 .76.89 6 6 0 0 1 2.42-.58 6.12 6.12 0 0 1 2.63.61 5.88 5.88 0 0 1 2.19 1.83 5.63 5.63 0 0 1 1.07 2.43 6.57 6.57 0 0 1-.87 4.42zM47.71 16.57h0a1.53 1.53 0 0 1-1.29.68H29.9a22.34 22.34 0 0 1 1.56-4.72 21.93 21.93 0 0 0-10.52 4.72h-3.31a1.56 1.56 0 0 1-1.33-.72 6.28 6.28 0 0 1-.9-3.22 5.28 5.28 0 0 1 .11-1.13 6.1 6.1 0 0 1 6-5A6.16 6.16 0 0 1 27.68 1a7.21 7.21 0 0 1 1.32.17h0a7.79 7.79 0 0 1 .94.28 6.16 6.16 0 0 1 3.66 4.07 5.57 5.57 0 0 1 1.69-.24A5.88 5.88 0 0 1 39.45 7a5.47 5.47 0 0 1 .77.89 6 6 0 0 1 5.09.07 6 6 0 0 1 3.25 4.26 6.46 6.46 0 0 1-.85 4.35z"/><path class="cls-4" d="M54.93 43.58a22.08 22.08 0 0 1-13.76 11.9A5.88 5.88 0 0 0 39 53.65a6.12 6.12 0 0 0-2.65-.65 6 6 0 0 0-2.46.53 7.15 7.15 0 0 0-.76-.89A5.94 5.94 0 0 0 29 51a5.57 5.57 0 0 0-1.69.24 6.15 6.15 0 0 0-3.66-4 5.82 5.82 0 0 0-.95-.29h0a6.93 6.93 0 0 0-1.31-.13A6.15 6.15 0 0 0 17.61 48a22.06 22.06 0 0 1 13.85-35.46 22.34 22.34 0 0 0-1.56 4.72 22.06 22.06 0 0 0 21.58 26.59 23 23 0 0 0 3.45-.27z"/></g><path d="M9.07 59a6.1 6.1 0 0 0 .93 3.25 1.55 1.55 0 0 0 1.3.75h5a1.55 1.55 0 0 1-1.3-.75 6.1 6.1 0 0 1-.93-3.25 5.83 5.83 0 0 1 .1-1.12 6.12 6.12 0 0 1 6-5 6.14 6.14 0 0 1 1.92-4.45c.15-.14.32-.29.49-.42a21.94 21.94 0 0 1-4.76-13.67 25.73 25.73 0 0 1 1-6.48c2.31-7.86 10.07-13.63 11.26-14.5a18.27 18.27 0 0 0-5.22 2.25 18.73 18.73 0 0 0-2.23 1.65 2.19 2.19 0 0 1-1.33-.72 6.28 6.28 0 0 1-.9-3.22 5.28 5.28 0 0 1 .11-1.13 6.1 6.1 0 0 1 6-5 6.13 6.13 0 0 1 1.92-4.45 5.89 5.89 0 0 1 1.72-1.15l-.23-.11a7.79 7.79 0 0 0-.92-.3A7.21 7.21 0 0 0 27.68 1a6.16 6.16 0 0 0-6.15 6.14 6.1 6.1 0 0 0-6 5 5.28 5.28 0 0 0-.11 1.13 6.28 6.28 0 0 0 .9 3.22 1.56 1.56 0 0 0 1.33.72h3.31A22 22 0 0 0 17.61 48c-.17.13-.34.28-.49.42a6.14 6.14 0 0 0-1.92 4.45 6.12 6.12 0 0 0-6 5A5.83 5.83 0 0 0 9.07 59z" id="Shadow"/><g id="Highligth" style="mix-blend-mode:overlay"><path class="cls-7" d="M42.71 16.58a1.53 1.53 0 0 1-1.29.68h5a1.53 1.53 0 0 0 1.29-.68 6.46 6.46 0 0 0 .85-4.38 6 6 0 0 0-3.25-4.26 6 6 0 0 0-5.09-.07 5.47 5.47 0 0 0-.77-.87 5.88 5.88 0 0 0-4.16-1.69 5.57 5.57 0 0 0-1.69.24 6.16 6.16 0 0 0-3.66-4.06 7.79 7.79 0 0 0-.94-.31A7.21 7.21 0 0 0 27.68 1a6 6 0 0 0-2.51.54 6.2 6.2 0 0 1 3.43 3.98 5.57 5.57 0 0 1 1.69-.24A5.88 5.88 0 0 1 34.45 7a5.47 5.47 0 0 1 .77.89 6 6 0 0 1 5.09.07 6 6 0 0 1 3.25 4.26 6.46 6.46 0 0 1-.85 4.38zM48.93 43.7a22.06 22.06 0 0 1-19-26.44 2.43 2.43 0 0 0 .26-3.34 2.27 2.27 0 0 0-2.34-.48 15.83 15.83 0 0 0-3.39 8.36c-.87 11 11.49 22.05 22 22.05a22.07 22.07 0 0 0 2.47-.15zM54.93 43.58a23 23 0 0 1-3.45.27c-.55 0-1.1 0-1.65-.07a22.07 22.07 0 0 1-13.66 11.7 5.63 5.63 0 0 1 1.07 2.43 6.57 6.57 0 0 1-.87 4.38 1.49 1.49 0 0 1-1.28.68h5a1.49 1.49 0 0 0 1.28-.68 6.57 6.57 0 0 0 .87-4.38 5.63 5.63 0 0 0-1.07-2.43 22.08 22.08 0 0 0 13.76-11.9z"/></g></g></g></svg>`
  }
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}






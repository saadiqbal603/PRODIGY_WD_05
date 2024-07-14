const apiKey = "dcfefc3e131f4f56a2a123555241407";
const weatherForm = document.getElementById("weatherForm");
const locationInput = document.getElementById("locationInput");
const weatherInfo = document.getElementById("weatherInfo");

weatherForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const location = locationInput.value;

  // Clear previous weather info
  weatherInfo.innerHTML = "";

  // Fetch weather data from WeatherAPI.com
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const { location, current } = data;

      const weatherDiv = document.createElement("div");
      weatherDiv.classList.add("weather-card");

      weatherDiv.innerHTML = `
                <h2>${location.name}, ${location.region}, ${location.country}</h2>
                <p>Weather: ${current.condition.text}</p>
                <p>Temperature: ${current.temp_c}°C</p>
                <p>Humidity: ${current.humidity}%</p>
                <p>Wind Speed: ${current.wind_kph} kph</p>
            `;

      weatherInfo.appendChild(weatherDiv);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherInfo.innerHTML = `<p>Failed to fetch weather data: ${error.message}. Please try again later.</p>`;
    });
});

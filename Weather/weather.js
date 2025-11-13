const apiKey = "01a490023c67ed0fb5b3a7fe36a881f6";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((err) => {
      showError(err.message);
    });
}

function displayWeather(data) {
  errorMsg.textContent = "";
  weatherCard.style.display = "block";

  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("description").textContent = data.weather[0].description;

  const iconCode = data.weather[0].icon;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError(message) {
  weatherCard.style.display = "none";
  errorMsg.textContent = message;
}
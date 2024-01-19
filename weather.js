const apiKey = "cc3065e0272ef10fbc98c62bb8652c26";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Event Listeners
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

let sidemeu = document.getElementById("sidemenu");

function openMenu() {
  sidemeu.style.right = "0";
}

function closeMenu() {
  sidemeu.style.right = "-200px";
}

// Weather Functions
async function checkWeather(city) {
  try {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      handleWeatherError();
    } else {
      const data = await response.json();
      displayWeatherData(data);
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

function handleWeatherError() {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
  document.querySelector(".forecast").style.display = "none";
}

function displayWeatherData(data) {
  console.log(data);

  updateCurrentWeather(data);
  displaySunriseAndSunset(data.sys.sunrise, data.sys.sunset, data.timezone);
  setWeatherIcon(data.weather[0].main);

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".forecast").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

function updateCurrentWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML =
    Math.round(data.wind.speed) + " km/h";
  document.querySelector(".max-temp").innerHTML =
    Math.round(data.main.temp_max) + "℃";
}

function displaySunriseAndSunset(
  sunriseTimestamp,
  sunsetTimestamp,
  timezoneOffset
) {
  const sunriseElement = document.querySelector(".sunrise");
  const sunsetElement = document.querySelector(".sunset");

  const sunriseDate = new Date((sunriseTimestamp + timezoneOffset) * 1000);
  const sunsetDate = new Date((sunsetTimestamp + timezoneOffset) * 1000);

  sunriseElement.innerHTML = formatTime(
    sunriseDate.getHours(),
    sunriseDate.getMinutes()
  );
  sunsetElement.innerHTML = formatTime(
    sunsetDate.getHours(),
    sunsetDate.getMinutes()
  );
}

function formatTime(hours, minutes) {
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

function setWeatherIcon(weatherMain) {
  const weatherIcon = document.querySelector(".weather-icon");

  switch (weatherMain) {
    case "Clouds":
      weatherIcon.src = "images-animated/cloudy.svg";
      break;
    case "Clear":
      weatherIcon.src = "images-animated/clear-day.svg";
      break;
    case "Rain":
      weatherIcon.src = "images-animated/rain.svg";
      break;
    case "Drizzle":
      weatherIcon.src = "images-animated/drizzle.svg";
      break;
    case "Mist":
      weatherIcon.src = "images-animated/mist.svg";
      break;
    case "Snow":
      weatherIcon.src = "images-animated/snow.svg";
      break;
    case "Thunderstorm":
      weatherIcon.src = "images-animated/thunderstorms.svg";
      break;
    case "Tornado":
      weatherIcon.src = "images-animated/tornado.svg";
      break;
    default:
      // Default icon if the weatherMain is not recognized
      weatherIcon.src = "images-animated/clear-day.svg";
  }
}

const apiKey = "cc3065e0272ef10fbc98c62bb8652c26";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "℃";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images-animated/cloudy.svg";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images-animated/clear-day.svg";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images-animated/rain.svg";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images-animated/drizzle.svg";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "images/snow.png";
    } else if (data.weather[0].main === "Thunderstorm") {
      weatherIcon.src = "images/thunderstorms.png";
    } else if (data.weather[0].main === "Tornado") {
      weatherIcon.src = "images/tornado.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

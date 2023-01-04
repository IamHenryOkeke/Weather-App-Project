const searchBtn = document.querySelector("button");
const inputForm = document.querySelector("form");

async function getWeatherData() {
    let cityName = document.querySelector("input").value;
    cityName === ""
        ? (cityName = "Lagos")
        : (cityName = document.querySelector("input").value);
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=74e5cd0c54200e60787922b9af13646d`
    const errorMessage = document.querySelector("span.error");
    try {
        const response = await fetch(apiURL, { mode: "cors" });
        const weatherData = await response.json();
        errorMessage.textContent = "";
        console.log(getNeededData(weatherData));
        populate(getNeededData(weatherData));

    } catch (err) {
        const response = await fetch(apiURL, { mode: "cors" });
        const weatherData = await response.json();
        errorMessage.textContent = weatherData.message + '. Search must be in the form of "City", "City, State" or "City, Country".';
        console.log("Error!!!!!!!!!!!!!!");
    }
}

const getNeededData = (data) => {
    let tempInCelsius = (data.main.temp - 273).toFixed(2)
    let feelsLikeInCelsius = (data.main.feels_like - 273).toFixed(2)
    return {
        location: data.name,
        temp: tempInCelsius,
        cloud: data.weather[0].description,
        cloudImg: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        feelsLike: feelsLikeInCelsius,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
    };
}

const toggleTempUnit = () => {
    var element = document.getElementById("myDIV");
    element.classList.toggle("tempToggle");
}

const populate = (obj) => {
    let location = document.getElementById("location");
    let temperature = document.getElementById("temp");
    let feelsLike = document.getElementById("feels");
    let humidity = document.getElementById("humidity");
    let windSpeed = document.getElementById("wind-speed")
    let cloud = document.getElementById("cloud");
    let cloudIcon = document.getElementById("cloud-icon")

    location.innerHTML = `${obj.location}`;
    cloud.innerHTML = `Cloud: ${obj.cloud}`;
    cloudIcon.src = obj.cloudImg;
    temperature.innerHTML = `${obj.temp}&#176;C`;
    feelsLike.innerHTML = `It feels likes ${obj.feelsLike}&#176;C`;
    humidity.innerHTML = `Humidity: ${obj.humidity}%`;
    windSpeed.innerHTML = `Wind Speed: ${obj.windSpeed} m/s`;
}

const toCelsius = (fahrenheit) => {
    return (5 / 9) * (fahrenheit - 32);
}

const toFahrenheit = (celsius) => {
    return ((9 / 5) * celsius) + 32;
}

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

getWeatherData()

searchBtn.addEventListener("click", getWeatherData);
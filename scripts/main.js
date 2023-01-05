const searchBtn = document.querySelector("button");
const inputForm = document.querySelector("form");
const toggleTemp = document.getElementById("tempToggle");


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
        console.log(weatherData)
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

const populate = (obj) => {
    let location = document.getElementById("location");
    let temperature = document.getElementById("temp");
    let feelsLike = document.getElementById("feels");
    let humidity = document.getElementById("humidity");
    let windSpeed = document.getElementById("wind-speed")
    let cloud = document.getElementById("cloud");
    let cloudIcon = document.getElementById("cloud-icon")

    location.textContent = `${obj.location}`;
    cloud.textContent = `Cloud: ${obj.cloud}`;
    cloudIcon.src = obj.cloudImg;
    temperature.textContent = `${obj.temp}`;
    feelsLike.textContent = obj.feelsLike;
    humidity.textContent = `Humidity: ${obj.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${obj.windSpeed} m/s`;
}

const toCelsius = (fahrenheit) => {
    return (5 / 9) * (fahrenheit - 32);
}

const toFahrenheit = (celsius) => {
    return ((9 / 5) * celsius) + 32;
}

const resetClass = () => {
    var tempVar = document.getElementById("temp");
    var feelsVar = document.getElementById("feels");
    if (tempVar.classList.contains("fahrenheit") && feelsVar.classList.contains("fahrenheit")) {
        tempVar.classList.replace("fahrenheit", "celsius");
        feelsVar.classList.replace("fahrenheit", "celsius");
    }

}

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

getWeatherData()

searchBtn.addEventListener("click", () => {
    getWeatherData;
    resetClass;
});

const toggleTempUnit = () => {
    var tempVar = document.getElementById("temp");
    var feelsVar = document.getElementById("feels");
    if (tempVar.classList.contains("celsius") && feelsVar.classList.contains("celsius")) {
        tempVar.classList.remove("celsius");
        tempVar.classList.add("fahrenheit");
        feelsVar.classList.remove("celsius");
        feelsVar.classList.add("fahrenheit");
        const x = (toFahrenheit(feelsVar.textContent)).toFixed(2);
        const y = (toFahrenheit(tempVar.textContent)).toFixed(2);
        tempVar.textContent = y;
        feelsVar.textContent = x;
    } else {
        tempVar.classList.remove("fahrenheit");
        tempVar.classList.add("celsius");
        feelsVar.classList.remove("fahrenheit");
        feelsVar.classList.add("celsius");
        const y = (toCelsius(tempVar.textContent)).toFixed(2);
        const x = (toCelsius(feelsVar.textContent)).toFixed(2);
        tempVar.textContent = y;
        feelsVar.textContent = x;
    }

}

toggleTemp.addEventListener("click", toggleTempUnit)
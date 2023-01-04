const btn = document.querySelector("button");

async function getWeatherData() {
    let cityName = document.querySelector("input").value;
    cityName === ""
        ? (cityName = "Lagos")
        : (cityName = document.querySelector("input").value);
    console.log(cityName);
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=74e5cd0c54200e60787922b9af13646d`
    try {
        const response = await fetch(apiURL, { mode: "cors" });
        const weatherData = await response.json();
        console.log(weatherData);
        console.log(getNeededData(weatherData));
        populate(getNeededData(weatherData));

    } catch (err) {
        console.log("Error!!!!!!!!!!!!!!");
    }
}

function getNeededData(data) {
    let tempInCelsius = (data.main.temp - 273).toFixed(2)
    let feelsLikeInCelsius = (data.main.feels_like - 273).toFixed(2)
    return {
        location: data.name,
        temp: tempInCelsius,
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

    location.textContent = `${obj.location}`;
    temperature.textContent = `${obj.temp}`;
    feelsLike.textContent = `${obj.feelsLike}`;
    humidity.textContent = `${obj.humidity} %`;
    windSpeed.textContent = `${obj.windSpeed}`;
}

getWeatherData()

btn.addEventListener("click", getWeatherData);
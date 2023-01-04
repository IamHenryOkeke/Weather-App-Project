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
        populate(weatherData);

    } catch (err) {
        console.log("Error!!!!!!!!!!!!!!");
    }
}

const populate = (data) => {
    let location = document.getElementById("location");
    let temperature = document.getElementById("temp");
    let feelsLike = document.getElementById("feels");
    let humidity = document.getElementById("humidity");
    let windSpeed = document.getElementById("wind-speed")

    location.textContent = `${data.name}`;
    temperature.textContent = `${data.main.temp}`;
    feelsLike.textContent = `${data.main.feels_like}`;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${data.weather[0].icon}`;
}

getWeatherData()

btn.addEventListener("click", getWeatherData);
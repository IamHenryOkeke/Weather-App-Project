
async function getWeatherData(cityName) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=74e5cd0c54200e60787922b9af13646d`
    try {
        const response = await fetch(apiURL, { mode: "cors" });
        const weatherDate = await response.json();
        console.log(weatherDate);
    } catch (err) {
        console.log("Error!!!!!!!!!!!!!!");
    }
}

getWeatherData("Lagos")
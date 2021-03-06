const cityInput = document.querySelector('.container .search-location input');
const findButton = document.querySelector('.container .search-location .find-weather');
const forecastContainer = document.querySelector('.container .weather');
const weatherIcon = document.querySelector('.container .weather-icon');
const weatherImg = document.querySelector('.container .weather-icon img');

function findWeather() {
    //clear previous city's weather info
    forecastContainer.innerHTML = "";
    weatherIcon.innerHTML = "";

    let cityName = cityInput.value;
    let API_key = 'c636bf9dabdbd12b76b9ca1995f40721';
    if (cityName === "") {
        alert("Please enter a city in the input field to see the weather.");
    };
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${API_key}`)
        .then(response => response.json())
        .then(data => {
        if (data.cod === '404') {
            alert("Hmm, we can't find a city with that name...");
        }

        let temp = data.main.temp.toFixed(0);
        let description = data.weather[0].description;
        let city = data.name;
        let country = data.sys.country;

        let forecast = document.createElement('div');
        forecast.innerHTML = `
        <span class="temp">${temp}° F</span>
        <span class="description">${description}</span>
        <span class="city">${city}, ${country}</span>
        `

        forecastContainer.appendChild(forecast);

        if (data.weather[0].main === "Clouds") {
            weatherIcon.innerHTML += ` <i class="fas fa-cloud"></i>`;
        } else if (data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle") {
            weatherIcon.innerHTML += ` <i class="fas fa-cloud-rain"></i>`;
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.innerHTML += ` <i class="far fa-snowflake"></i>`;
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.innerHTML += ` <i class="fas fa-sun"></i>`;
        } else if (data.weather[0].main === "Thunderstorm") {
            weatherIcon.innerHTML += ` <i class="fas fa-bolt"></i>`;
        } else if (data.weather[0].main === "Smoke" || data.weather[0].main === "Mist" || data.weather[0].main === "Haze" || data.weather[0].main === "Fog" || data.weather[0].main === "Dust" || data.weather[0].main === "Ash" || data.weather[0].main === "Sand") {
            weatherIcon.innerHTML += ` <i class="fas fa-smog"></i>`;
        }
    });
    cityInput.value = "";;
}

findButton.addEventListener('click', findWeather);
document.onkeydown = function(event) {
    if (event.keyCode == 13) {
        findWeather();
    }
}
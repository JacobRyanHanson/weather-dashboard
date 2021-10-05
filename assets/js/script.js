//TODO: Add Weather Icons
//TODO: Flex Format Weather Cards
//TODO: Add Search History (Make it autosearch on click)
//TODO: Fix UVI Color Coding

var form = document.querySelector("#id-city-form");
var cityInput = document.querySelector("#city-input");

var overview = document.querySelector(".overview");
var cityName = overview.querySelector(".city-name");
var weatherIcon = overview.querySelector(".weather-icon");
var temp = overview.querySelector(".temp");
var wind = overview.querySelector(".wind");
var humidity = overview.querySelector(".humidity");
var uvi = overview.querySelector(".uvi span");

var card0 = document.querySelector("div[data-id='0']");
var card1 = document.querySelector("div[data-id='1']");
var card2 = document.querySelector("div[data-id='2']");
var card3 = document.querySelector("div[data-id='3']");
var card4 = document.querySelector("div[data-id='4']");

var weatherCards = [{
        date: card0.querySelector(".date"),
        temp: card0.querySelector(".temp"),
        wind: card0.querySelector(".wind"),
        humidity: card0.querySelector(".humidity")
    },
    {
        date: card1.querySelector(".date"),
        temp: card1.querySelector(".temp"),
        wind: card1.querySelector(".wind"),
        humidity: card1.querySelector(".humidity")
    },
    {
        date: card2.querySelector(".date"),
        temp: card2.querySelector(".temp"),
        wind: card2.querySelector(".wind"),
        humidity: card2.querySelector(".humidity")
    },
    {
        date: card3.querySelector(".date"),
        temp: card3.querySelector(".temp"),
        wind: card3.querySelector(".wind"),
        humidity: card3.querySelector(".humidity")
    },
    {
        date: card4.querySelector(".date"),
        temp: card4.querySelector(".temp"),
        wind: card4.querySelector(".wind"),
        humidity: card4.querySelector(".humidity")
    },
]

const forcastTimeline = 5;

form.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(event) {
    event.preventDefault();
    var input = cityInput.value

    geocode(input);
}

function geocode(input) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=1&appid=2739206277a259e4144072cd50bda376"
    fetch(url).then(function (response) {
        response.json().then(function (data) {
            getForcast(data[0].name, data[0].lat, data[0].lon);
        });
    });
}

function getForcast(location, latitude, longitude) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +
        "&units=imperial&exclude=hourly,minutely&appid=2739206277a259e4144072cd50bda376"
    fetch(url).then(function (response) {
        response.json().then(function (data) {
            displayData(location, data);
        });
    });
}

function displayData(location, data) {
    console.log(data)
    cityName.append(location + " " + formatDate(data.current.dt));
    var iconCode = data.current.weather[0].icon;
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png")

    temp.append(data.current.temp);
    wind.append(data.current.wind_speed);
    humidity.append(data.current.humidity);
    uvi.append(data.current.uvi);

    for (var i = 0; i < forcastTimeline; i++) {
        weatherCards[i].date.textContent = formatDate(data.daily[i].dt);
        weatherCards[i].temp.textContent += data.daily[i].temp.day;
        weatherCards[i].wind.textContent += data.daily[i].wind_speed;
        weatherCards[i].humidity.textContent += data.daily[i].humidity;
    }
}

function formatDate(weatherDate) {
    var date = new Date(0);
    date.setUTCSeconds(weatherDate);
    var dateOutput = "";
    dateOutput += (parseInt(date.getMonth()) + 1) + "/";
    dateOutput += date.getDate() + "/";
    dateOutput += date.getFullYear();
    return dateOutput;
}
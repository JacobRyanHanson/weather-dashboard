var form = document.querySelector("#id-city-form");
var cityInput = document.querySelector("#city-input");

var overview = document.querySelector(".overview");
var cityName = overview.querySelector("#city-name");
var temp = overview.querySelector(".temp");
var wind = overview.querySelector(".wind");
var humidity = overview.querySelector(".humidity");
var uvi = overview.querySelector(".uvi span");

var card0 = document.querySelector("div[data-id='0']");
var card1 = document.querySelector("div[data-id='1']");
var card2 = document.querySelector("div[data-id='2']");
var card3 = document.querySelector("div[data-id='3']");
var card4 = document.querySelector("div[data-id='4']");

var date = new Date(0);

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
    cityName.append(location + " " + getDate(data.current.dt));
    temp.append(data.current.temp);
    wind.append(data.current.wind_speed);
    humidity.append(data.current.humidity);
    uvi.append(data.current.uvi);



}

function getDate(weatherDate) {
    date.setUTCSeconds(weatherDate);

    var dateOutput = "";
    dateOutput += (parseInt(date.getMonth()) + 1) + "/";
    dateOutput += date.getDate() + "/";
    dateOutput += date.getFullYear();
    return dateOutput;
}
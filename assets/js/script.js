
//TODO: Flex Format Weather Cards
//TODO: Add Search History (Make it autosearch on click)
//TODO: Fix UVI Color Coding

var form = document.querySelector("#id-city-form");
var cityInput = document.querySelector("#city-input");

var overview = document.querySelector(".overview");

var card0 = document.querySelector("div[data-id='0']");
var card1 = document.querySelector("div[data-id='1']");
var card2 = document.querySelector("div[data-id='2']");
var card3 = document.querySelector("div[data-id='3']");
var card4 = document.querySelector("div[data-id='4']");

var weatherCards = [{
        date: overview.querySelector(".date"),
        weatherIcon: overview.querySelector(".weather-icon"),
        temp: overview.querySelector(".temp"),
        wind: overview.querySelector(".wind"),
        humidity: overview.querySelector(".humidity"),
        uvi: overview.querySelector(".uvi span")
    },
    {
        date: card0.querySelector(".date"),
        weatherIcon: card0.querySelector(".weather-icon"),
        temp: card0.querySelector(".temp"),
        wind: card0.querySelector(".wind"),
        humidity: card0.querySelector(".humidity")
    },
    {
        date: card1.querySelector(".date"),
        weatherIcon: card1.querySelector(".weather-icon"),
        temp: card1.querySelector(".temp"),
        wind: card1.querySelector(".wind"),
        humidity: card1.querySelector(".humidity")
    },
    {
        date: card2.querySelector(".date"),
        weatherIcon: card2.querySelector(".weather-icon"),
        temp: card2.querySelector(".temp"),
        wind: card2.querySelector(".wind"),
        humidity: card2.querySelector(".humidity")
    },
    {
        date: card3.querySelector(".date"),
        weatherIcon: card3.querySelector(".weather-icon"),
        temp: card3.querySelector(".temp"),
        wind: card3.querySelector(".wind"),
        humidity: card3.querySelector(".humidity")
    },
    {
        date: card4.querySelector(".date"),
        weatherIcon: card4.querySelector(".weather-icon"),
        temp: card4.querySelector(".temp"),
        wind: card4.querySelector(".wind"),
        humidity: card4.querySelector(".humidity")
    }
]

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
    weatherCards[0].date.textContent = "";
    uvIndex = data.daily[0].uvi;

    weatherCards[0].uvi.textContent = uvIndex;
    weatherCards[0].uvi.className = "";
    addUviBackground(uvIndex);

    weatherCards[0].date.textContent = location + " ";

    for (var i = 0; i < weatherCards.length; i++) {
        weatherCards[i].date.textContent = "";
        weatherCards[i].date.append(formatDate(data.daily[i].dt));
        var iconCode = data.daily[i].weather[0].icon;
        weatherCards[i].weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
        weatherCards[i].temp.textContent = "Temp: " + data.daily[i].temp.day;
        weatherCards[i].wind.textContent = "Wind: " + data.daily[i].wind_speed;
        weatherCards[i].humidity.textContent = "Humidity: " + data.daily[i].humidity;
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

function addUviBackground(uvIndex) {
    if (uvIndex < 3) {
        weatherCards[0].uvi.classList.add("low");
    } else if (uvIndex < 6) {
        weatherCards[0].uvi.classList.add("moderate");
    } else if (uvIndex < 8) {
        weatherCards[0].uvi.classList.add("high");
    } else if (uvIndex < 11) {
        weatherCards[0].uvi.classList.add("very-high");
    } else {
        weatherCards[0].uvi.classList.add("extreme");
    }
}
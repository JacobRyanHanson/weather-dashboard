//TODO: Flex Format Weather Cards & STYLE

var citySearch = document.querySelector(".city-search");
var form = document.querySelector(".city-form");
var cityInput = document.querySelector(".city-input");

var overview = document.querySelector(".overview");
var cityName = overview.querySelector(".city-name");
var weatherIcon = overview.querySelector(".weather-icon");
var temp = overview.querySelector(".temp span");
var wind = overview.querySelector(".wind span");
var humidity = overview.querySelector(".humidity span");
var uvi = overview.querySelector(".uvi span");

var card0 = document.querySelector("div[data-id='0']");
var card1 = document.querySelector("div[data-id='1']");
var card2 = document.querySelector("div[data-id='2']");
var card3 = document.querySelector("div[data-id='3']");
var card4 = document.querySelector("div[data-id='4']");

var weatherCards = [{
        date: card0.querySelector(".date"),
        weatherIcon: card0.querySelector(".weather-icon"),
        temp: card0.querySelector(".temp span"),
        wind: card0.querySelector(".wind span"),
        humidity: card0.querySelector(".humidity span")
    },
    {
        date: card1.querySelector(".date"),
        weatherIcon: card1.querySelector(".weather-icon"),
        temp: card1.querySelector(".temp span"),
        wind: card1.querySelector(".wind span"),
        humidity: card1.querySelector(".humidity span")
    },
    {
        date: card2.querySelector(".date"),
        weatherIcon: card2.querySelector(".weather-icon"),
        temp: card2.querySelector(".temp span"),
        wind: card2.querySelector(".wind span"),
        humidity: card2.querySelector(".humidity span")
    },
    {
        date: card3.querySelector(".date"),
        weatherIcon: card3.querySelector(".weather-icon"),
        temp: card3.querySelector(".temp span"),
        wind: card3.querySelector(".wind span"),
        humidity: card3.querySelector(".humidity span")
    },
    {
        date: card4.querySelector(".date"),
        weatherIcon: card4.querySelector(".weather-icon"),
        temp: card4.querySelector(".temp span"),
        wind: card4.querySelector(".wind span"),
        humidity: card4.querySelector(".humidity span")
    }
]

var searchHistory;
loadHistory();

geocode("chicago");

form.addEventListener("submit", formSubmitHandler);
citySearch.addEventListener("click", searchHistoryHandler);

function formSubmitHandler(event) {
    event.preventDefault();
    var input = cityInput.value
    geocode(input);
}

function searchHistoryHandler(event) {
    if (event.target.matches(".city-search h3")) {
        geocode(event.target.textContent)
    }
}

function geocode(input) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=1&appid=2739206277a259e4144072cd50bda376"
    fetch(url).then(function (response) {
        response.json().then(function (data) {
            if (data.length > 0) {
                getForcast(data[0].name.trim(), data[0].lat, data[0].lon);
            } else {
                alert("Error: City Not Found");
            }
        });
    }).catch(function () {
        alert("Unable to connect to OpenWeather");
    });
}

function getForcast(location, latitude, longitude) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +
        "&units=imperial&exclude=hourly,minutely&appid=2739206277a259e4144072cd50bda376"
    fetch(url).then(function (response) {
        response.json().then(function (data) {
            addToSearchHistory(location);
            displayData(location, data);
        });
    }).catch(function () {
        alert("Unable to connect to OpenWeather");
    });
}

function addToSearchHistory(location) {
    var city = "";
    var array = location.split(" ");
    for (var i = 0; i < array.length; i++) {
        array[i] = array[i].substring(0, 1).toUpperCase() + array[i].substring(1, array[i].length).toLowerCase();
        city += array[i] + " ";
    }
    city = city.trim();

    if (!inArray(city)) {
        searchHistory.push(city);
    }

    if (!onPage(city)) {
        var searchHistoryContainer = document.createElement("h3");
        searchHistoryContainer.textContent = city;
        searchHistoryContainer.className = "city-link";
        citySearch.appendChild(searchHistoryContainer);
    }

    if (searchHistory.length > 8) {
        searchHistory.shift();
        citySearch.removeChild(citySearch.childNodes[5]);
    }

    saveHistory();
}

function inArray(city) {
    var isInArray = false;
    for (var i = 0; i < searchHistory.length; i++) {
        if (city === searchHistory[i]) {
            isInArray = true;
        }
    }
    return isInArray;
}

function onPage(city) {
    var isOnPage = false;
    for (var i = 5; i < citySearch.childNodes.length; i++) {
        if (city === citySearch.childNodes[i].textContent) {
            isOnPage = true;
        }
    }
    return isOnPage;
}

function displayData(location, data) {
    console.log(data)
    cityName.innerHTML = location + " " + formatDate(data.daily[0].dt);
    var iconCode = data.daily[0].weather[0].icon;
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");

    temp.textContent = data.daily[0].temp.day;
    wind.textContent = data.daily[0].wind_speed;
    humidity.textContent = data.daily[0].humidity;
    uvi.textContent = data.daily[0].uvi;

    uvi.className = "";
    addUviBackground(data.daily[0].uvi);

    for (var i = 0; i < weatherCards.length; i++) {
        weatherCards[i].date.textContent = formatDate(data.daily[i+1].dt);
        iconCode = data.daily[i+1].weather[0].icon;
        weatherCards[i].weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
        weatherCards[i].temp.textContent = data.daily[i+1].temp.day;
        weatherCards[i].wind.textContent = data.daily[i+1].wind_speed;
        weatherCards[i].humidity.textContent = data.daily[i+1].humidity;
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
        uvi.classList.add("low");
    } else if (uvIndex < 6) {
        uvi.classList.add("moderate");
    } else if (uvIndex < 8) {
        uvi.classList.add("high");
    } else if (uvIndex < 11) {
        uvi.classList.add("very-high");
    } else {
        uvi.classList.add("extreme");
    }
}

function saveHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function loadHistory() {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (!searchHistory) {
        searchHistory = [];
        return false;
    }

    for (var i = 0; i < searchHistory.length; i++) {
        addToSearchHistory(searchHistory[i]);
    }
}
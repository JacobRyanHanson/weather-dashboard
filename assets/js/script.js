var form = document.querySelector("#id-city-form");
var userInput = document.querySelector("#city-input");

form.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(event) {
    event.preventDefault();
    var input = userInput.value

    geocode(input);




    //Weather Data for lat and lon location
    // var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=2739206277a259e4144072cd50bda376"
    // fetch(url).then(function (response) {
    //     response.json().then(function (data) {
    //         console.log(data);
    //     });
    // });
}

function geocode(input) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=1&appid=2739206277a259e4144072cd50bda376"
    fetch(url);

}
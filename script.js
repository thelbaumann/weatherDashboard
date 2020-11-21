var apiKey = "5a8ad98e6af76e72b4b654f3790e8fcd";
var now =  moment().format("MM/DD/YYYY");
var searchBar = $("#searchBar").val();


var city;
var cityLon;
var cityLat;
var cityTemp;
var cityHumidity;
var cityUV;
var cityWeatherIcon;
var weatherIconURL;

var citiesSearched = [];

// localStorage.removeItem("cities");

$(document).ready(function() {

    citiesSearched = JSON.parse(localStorage.getItem("cities") || "[]");

    for (i=0; i<citiesSearched.length; i++) {

        city = citiesSearched[i];

        var cityItemLi = $("<li>");

        var cityItemBtn = $("<button>");

        cityItemBtn.text(city);
        cityItemBtn.attr("value", city);
        cityItemBtn.attr("class", "cityBtn");

        cityItemLi.append(cityItemBtn);

        $("#searchedCities").append(cityItemLi);
    }

});



// if pressing enter, trigger search button

$("body").keypress(function(e){
    if (e.which == 13) {
        $('#searchBtn').click();
    }
});

$("body").on('click', function(event) {

    if ($(event.target).hasClass("cityBtn")) {

    if ($("#searchBar").val() == "") {

        if ($(event.target).attr("value") == undefined) {
            $("#error").text("You need to enter a value!");
            return;
        }

        else {
            $("#error").text("");
            city = $(event.target).attr("value");
            pullCityCoord();
        }
    }

    else {

        $("#error").text("");

        city = $("#searchBar").val();

        for (i=0; i<citiesSearched.length; i++) {
            if (citiesSearched[i] == city) {
                $("#error").text("You've already added this city to the list!");
                return;
            }
        }

        var cityItemLi = $("<li>");

        var cityItemBtn = $("<button>");

        cityItemBtn.text(city);
        cityItemBtn.attr("value", city);
        cityItemBtn.attr("class", "cityBtn");

        cityItemLi.append(cityItemBtn);

        $("#searchedCities").append(cityItemLi);

        $("#searchBar").val("");

        citiesSearched.push(city);
        localStorage.setItem("cities", JSON.stringify(citiesSearched));

        pullCityCoord();

    }

    }

});

function pullCityCoord() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + apiKey,
        method: "GET"
    }).then(function(response) {
        cityLon = response.coord.lon;
        cityLat = response.coord.lat;
        pullWeatherInfo();
    });
}


function pullWeatherInfo() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function(response) {
        cityTemp = response.current.temp;
        cityHumidity = response.current.humidity;
        cityWindSpeed = response.current.wind_speed;
        cityUV = response.current.uvi;
        cityWeatherIcon = response.current.weather[0].icon;


        $("#todayCity").text(city);

        $("#todayDate").text(now);

        $("#todayTemp").text(cityTemp);

        $("#todayHumidity").text(cityHumidity);

        $("#todayWind").text(cityWindSpeed);

        $("#todayUV").text(cityUV);

        weatherIconURL = "http://openweathermap.org/img/wn/" + cityWeatherIcon + "@2x.png";

        $("#todayImg").attr("src", weatherIconURL);

        for (i=1; i<response.daily.length; i++) {
            var futureDayTitle = $("#day-" + i + " .futureDate");
            var futureDayDate = moment.unix(response.daily[i].dt).format("MM/DD/YYYY");
            futureDayTitle.text(futureDayDate);
            var futureIcon = response.daily[i].weather[0].icon;
            var futureIconURL = "http://openweathermap.org/img/wn/" + futureIcon + "@2x.png";
            $("#day-" + i + " .futureImg").attr("src", futureIconURL);
            var futureTemp = response.daily[i].temp.day;
            $("#day-" + i + " .futureTemp").text(futureTemp);
            var futureHumidity = response.daily[i].humidity;
            $("#day-" + i + " .futureHumidity").text(futureHumidity);
        }

        $(".weather-information").css("visibility", "visible");

    });

}
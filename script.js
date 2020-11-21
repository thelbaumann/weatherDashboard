var apiKey = "5a8ad98e6af76e72b4b654f3790e8fcd";
var now =  moment().format("MM/DD/YYYY");


var city;
var cityLon;
var cityLat;
var cityTemp;
var cityHumidity;
var cityUV;
var cityWeatherIcon;
var weatherIconURL;

$("#searchBtn").click(function(event) {

    console.log("button was clicked!");

    city = $("#searchBar").val();

    console.log(city);

    var cityItemLi = $("<li>");

    var cityItemBtn = $("<button>");

    cityItemBtn.text(city);
    cityItemBtn.attr("value", city);

    cityItemLi.append(cityItemBtn);

    $("#searchedCities").append(cityItemLi);

    pullFirstAPI();

});

function pullFirstAPI() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + apiKey,
        method: "GET"
    }).then(function(response) {
        cityLon = response.coord.lon;
        cityLat = response.coord.lat;
        // cityTemp = response.main.temp;
        // cityHumidity = response.main.humidity;
        // cityWindSpeed = response.wind.speed;
        console.log(cityLon);
        console.log(cityLat);
        pullSecondAPI();
    });
}


function pullSecondAPI() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function(response) {
        cityTemp = response.current.temp;
        cityTemp = cityTemp.toFixed(1);
        cityHumidity = response.current.humidity;
        cityWindSpeed = response.current.wind_speed;
        cityUV = response.current.uvi;
        cityWeatherIcon = response.current.weather[0].icon;
        console.log(cityWeatherIcon);
        setDisplay();
    });

}

function setDisplay() {

    $("#todayCity").text(city);

    $("#todayDate").text(now);

    $("#todayTemp").text(cityTemp);

    $("#todayHumidity").text(cityHumidity);

    $("#todayWind").text(cityWindSpeed);

    $("#todayUV").text(cityUV);

    weatherIconURL = "http://openweathermap.org/img/wn/" + cityWeatherIcon + "@2x.png";

    $("#todayImg").attr("src", weatherIconURL);


}
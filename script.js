// preset variables

var apiKey = "5a8ad98e6af76e72b4b654f3790e8fcd";
var now =  moment().format("MM/DD/YYYY");
var searchBar = $("#searchBar").val();


// variables to be set by js/user input

var city;
var cityLon;
var cityLat;
var cityTemp;
var cityHumidity;
var cityUV;
var cityWeatherIcon;
var weatherIconURL;

var citiesSearched = [];


// on page load, update the cities searched array to match the localstorage array. if there are cities to display, display them in the list
    // and provide a clear button. if not, move on.

$(document).ready(function() {

    citiesSearched = JSON.parse(localStorage.getItem("cities") || "[]");

    if (citiesSearched.length>0) {
        $("#clearResults").css("display", "block");
    }

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



// if pressing enter, trigger on click functions

$("body").keypress(function(e){
    if (e.which == 13) {
        $('#searchBtn').click();
    }
});


// on click button listens for a click on anywhere on the code body, and only institutes an action if it has the "cityBtn" class

$("body").on('click', function(event) {

    // if what is clicked is a button

    if ($(event.target).hasClass("cityBtn")) {

        // if the search input has no user input when a button is clicked, check for conditionals

        if ($("#searchBar").val() == "") {

            // if the search input is empty, and the user clicked the search button, give an error

            if ($(event.target).attr("value") == undefined) {
                $("#error").text("You need to enter a city!");
                return;
            }
            
            // if the search input is empty, and the user clicked on a previously entered city in the history, load that city
                // but do not re-add it to the array or to the list.

            else {
                $("#error").text("");
                city = $(event.target).attr("value");
                pullCityCoord();
            }
        }

        else {

            // confirm that on input, the user hits the search button and not the other buttons

            if ($(event.target).is("#searchBtn")) {

                $("#error").text("");

                city = $("#searchBar").val();

                // capitalize every word of the city, even if the user didn't input it that way
                    // reduces it displaying in lowercase on the page, and also slipping by the if statements looking for duplicates

                var capitalize = (phrase) => {
                    return phrase
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                };
                
                city = capitalize(city);

                // make sure if a city is entered, it hasn't already been entered before, after the input has been homogenized

                for (i=0; i<citiesSearched.length; i++) {
                    if (citiesSearched[i] == city) {
                        $("#error").text("You've already added this city to the list!");
                        return;
                    }
                }

                // create a list item containing a button with the text and value of the city inputed
                        // append this button to the user history list underneath the search input

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

                // update variable array and local storage array to both include the new city

                $("#clearResults").css("display", "block");

                pullCityCoord();

            }

            else {
                $("#error").text("Please click the search button to search for a new city!");
            }

        

        }

    }

});

function pullCityCoord() {

    // take the city name from the user input or from clicking a button of a previously searched city and pull the lat/lon of that city from the API

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + apiKey,
        method: "GET",
        statusCode: {
            404: function() {
                $("#error").text("Can't locate city! Please double check spelling!");
            }
        }
    }).then(function(response) {
        cityLon = response.coord.lon;
        cityLat = response.coord.lat;
        pullWeatherInfo();
    });
}


function pullWeatherInfo() {

    // using the lat/lon values pulled from the last function, use another url with queries lat & lon to pull all weather data needed for the page

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

        // color the UV variable based on severity

        if (cityUV < 3) {
            $("#todayUV").css("background-color", "rgb(0,128,0)");
            $("#todayUV").css("color", "white");
            $("#todayUV").css("padding", "1%");
            $("#todayUV").css("border-radius", "5px");
        }

        if (cityUV > 2 && cityUV < 6) {
            $("#todayUV").css("background-color", "rgb(0,255,0)");
            $("#todayUV").css("color", "black");
            $("#todayUV").css("padding", "1%");
            $("#todayUV").css("border-radius", "5px");
        }

        if (cityUV > 5 && cityUV < 8) {
            $("#todayUV").css("background-color", "rgb(255,255,0)");
            $("#todayUV").css("color", "black");
            $("#todayUV").css("padding", "1%");
            $("#todayUV").css("border-radius", "5px");
        }

        if (cityUV > 7 && cityUV < 11) {
            $("#todayUV").css("background-color", "rgb(255,140,0)");
            $("#todayUV").css("color", "black");
            $("#todayUV").css("padding", "1%");
            $("#todayUV").css("border-radius", "5px");
        }

        if (cityUV > 10) {
            $("#todayUV").css("background-color", "rgb(255,0,0))");
            $("#todayUV").css("color", "white");
            $("#todayUV").css("padding", "1%");
            $("#todayUV").css("border-radius", "5px");
        }

        weatherIconURL = "http://openweathermap.org/img/wn/" + cityWeatherIcon + "@2x.png";

        $("#todayImg").attr("src", weatherIconURL);

        // loop through the array of future days in the API and display the data/dates in the five-day forecast

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

        // make the weather info visible, as it is defaulted to be hidden on page load until a user inputs a city

        $(".weather-information").css("visibility", "visible");

    });

}

// on click of the clear button, clears the variable and local storage arrays, as well as the user history list, and hides the clear button
        // until a city is added to the list again to be cleared

$("#clearResults").on('click', function(event) {
    localStorage.removeItem("cities");
    citiesSearched = [];
    $("#searchedCities").empty();
    $("#clearResults").hide();
});
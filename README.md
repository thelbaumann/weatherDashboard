# Weather Dashboard

This is a web application built to function as a dashboard of weather information for any city the user searches. Utilizing some bootstrap and semantic html, as well as other responsive css, the page is usable on all screen sizes and is adaptable for different devices. All of the functionality of this page is powered by jQuery, Moment.js, and the OpenWeather API. I was not given any code file templates for this assignment and simply built it off a single photo of what the final product should resemble. This project is currently deployed and can be viewed at [https://thelbaumann.github.io/weatherDashboard/](https://thelbaumann.github.io/weatherDashboard/).


## About The Project

This web application allows you to view the weather for an area of your choice. It opens by providing a search input in which to search for your city, or if you have searched cities previously, you can click on any of the cities listed in your history to view them again. Once a city has been inputed one way or another, the user can see not only current day weather for that city, but also a five-day forecast. This weather information includes date, temperature, humidity, wind speed, uv index and its severity (indicated by color), and an icon representation of the category of weather on that particular day.

This is the image I was given to guide the design/flow of the page:

![demonstration image of the project](https://github.com/thelbaumann/weatherDashboard/blob/main/Assets/demo_img.png)

#### User Story
I was given the following user story to guide my development:

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

#### Acceptance Criteria
As a part of this project, I was also provided with the following standards that my project should meet:

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

## Walkthrough

### First Look
![opening page of web application](https://github.com/thelbaumann/weatherDashboard/blob/main/Assets/screen_1.png)


When you first load the weather dashboard, it presents you with a search field and your history of previously searched cities, if you have one. No weather information is available upon load until a city is entered or chosen from the history. When a button is clicked on the page, it begins a large function with many conditionals to fulfill all of the user scenarios. First, it validates that what the user clicked was a button. If it was, it validates if the search field is empty. 

IF there is text in the search field, and it was the search button that was pushed, it pulls the user input of the search field. It then standardizes the user input by formatting the input to capitalize all of the words. This homogenization allows a for loop to run easily to recognize duplicates in the list of cities. Entering a city that already exists in the user history will result in an error displayed to the user. It will not be added a second time. If it has not been added, it creates a button displaying the city name, assigns it a value attribute of the same name, and appends that button to a list item. That list item is then appended to the user history list below the search bar. The city name is then inserted into a url and uses an ajax call to the OpenWeather API to get the latitude/longitude of the given city. This first ajax calls leads to another, which uses those longitude/latitude values to pull the rest of the weather information for the page.

IF the search field was empty, it checks to see which button was pushed. If the search button was pushed for an empty search field, it displays an error to the user. If the search field is blank, but the user selected a button from their own user history, it loads the city that the user selected.


### Loading a City from the User History
![user history for city selection](https://github.com/thelbaumann/weatherDashboard/blob/main/Assets/screen_2.png)

Upon page load, or whenever the web application is being used, if the user has a prior history of previously searched cities, those cities can be re-selected through that user history list under the search feature. Each city listed functions as a button, which will trigger the click function on the page, and pass the validation for the click being on the button. But, instead of running the function statements to create a new list item, it uses if statements to determine the current situation and switch to the new city without re-assigning it to the array or user history. First, the search input has to be blank in order to select a city from the user's history. Otherwise, the application will prompt you to click the search button to enter a new city. Given that the search field is blank, it validates whether or not the button clicked has a value attribute. The search button is the only button on the page without a value attribute, so this statement ensures a button was clicked from the list of previously searched cities. From here, it simply pulls the city name from the value attribute of the button which was clicked, breaks out of the current function, and begins the first call to the API using this information.


### Clearing the user history
![clearing user history on the web application](https://github.com/thelbaumann/weatherDashboard/blob/main/Assets/screen_3.png)

If the user ever wishes to clear their history, a clear history button appears whenever there is at least one item in the user's history. This button, on trigger of the onclick function, will remove the local storage/variable array of cities, clear the displayed user history list, and hide the clear history button (until a new city is added again)!


### Possible Errors
![web application errors](https://github.com/thelbaumann/weatherDashboard/blob/main/Assets/screen_4.png)

There are a few error messages that can appear under the search field for the user if something happens.

First, if the user attempts to submit a new city by clicking a button other than the search button.

Secondly, if the user attempts to submit a blank search field.

Thirdly, if the user tries to add the same city to the list again.

Lastly, if the user enters a city that does not exist in the API.


## Installing/Dependencies
No prerequisites or browser modifications are needed to run the page online here.
If you wish to clone the project,

git@github.com:thelbaumann/weatherDashboard.git

## Credits

I had a lot of help from Stack Overflow threads for this project!

I used this [first thread](https://stackoverflow.com/questions/20943089/how-to-convert-unix-timestamp-to-calendar-date-moment-js) to help me understand how to use Moment.js to convert a unix timestamp into a more recognizable/user-friendly format for the page.

Next, I used [another thread](https://stackoverflow.com/questions/14934317/how-to-handle-404-error-in-jquery-post) to help me display a certain error if a user would enter a city not recognized by the API.

After that, I consulted [a thread on capitalization](https://api.jquery.com/find/) to help me homogenize the user input both on the back end and front end, so that different capitalization was no longer a factor in the elimination of duplicates from the list.

Lastly, I pulled a code snippet from a thread on [enter buttons triggering click events](https://stackoverflow.com/questions/9146651/trigger-an-event-on-click-and-enter) to help run the same function as the search button if the user hits the enter key.


## Authors
Laura Baumann (https://www.linkedin.com/in/laura-baumann-070338102/)

## License
This project is licensed under [MIT](LICENSE) - 2020 Laura Baumann

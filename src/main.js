import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(() => {
  $("#submit-btn").click(() => {
    const weather =  $("#weather").val();

    const weather_url = `http://api.openweathermap.org/data/2.5/weather?q=${weather}&appid=[API KEY HERE]`;

    fetch(weather_url)
      .then(response => response.json())
      .then(data => {
        getWeatherInfo(data);

        const gif = data.name + " " + data.weather[0].description; // Seattle broken clouds

        const giphy_url = `http://api.giphy.com/v1/gifs/search?q=${gif}&api_key=${process.env.API_KEY}`;
        fetch(giphy_url)
          .then(response => response.json())
          .then(data => getElements(data))
          .catch(err => console.log(err));
      })
      .catch(err => {
        $("#output").append("<h3 id='error'>PLEASE ENTER IN A VALID LOCATION!</h3>");
        console.log(err);
      });

    const getElements = response => {
      $("img").remove();
      $("#output").append(`<img src=${response.data[0].images.original.url} alt=${response.data[0].title}>`);
    };

    const getWeatherInfo = response => {
      $("h3").remove();
      $("#output").append(`<h3>${response.name}</h3>`);
      $("#output").append(`<h3 id="weather-description">${response.weather[0].description}</h3>`);
      $("#output").append(`<h3>${((response.main.temp - 273.15) * (9/5) + 32).toFixed(2)}<span>&#8457;</span></h3>`);
    };


    // let request = new XMLHttpRequest();```
    // request.onreadystatechange = function() {
    //   if (this.readyState === 4 && this.status === 200) {
    //     const response = JSON.parse(this.responseText);
    //     getElements(response);
    //   }
    // };

    // request.open("GET", url, true);
    // request.send();

  });
});

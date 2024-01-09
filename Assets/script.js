//API key = bd3136b1de02f5dec5a45d5eb3dea4e9
//Displayed per city: Date, Icon representing weather, temp, humidity, wind speed
const citySearch = document.querySelector("#city-search");
const stateSearch = document.querySelector("#state-search");
const countrySearch = document.querySelector("#country-search");
const searchButton = document.querySelector("#search");

const day0 = document.querySelector("#day0");
const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");
const day4 = document.querySelector("#day4");
let dayArray = [day0, day1, day2, day3, day4];

const weatherIcon = (weather) => {
    let icon;
    switch(weather) {
        case "Sunny":
            icon = "🥵";
            break;
        case "Clouds":
            icon = "☁️";
            break;
        case "Rain":
            icon = "☔";
            break;
        case "Clear":
            icon = "☀️"
            break;
        case "Windy":
            icon = "🌀"
            break;
        default:
            icon = "☀️"
    }
    return icon;
}

//gets city, state, country; finds lat+lon; gets weather data for 5 days
const getWeatherData = async(city, state, country) => {
    // const getLatLonResponse= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=bd3136b1de02f5dec5a45d5eb3dea4e9`);
    // const latLonData = await getLatLonResponse.json();
    // const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latLonData[0].lat}&lon=${latLonData[0].lon}&units=imperial&appid=bd3136b1de02f5dec5a45d5eb3dea4e9`);
    // const weatherData = await weatherResponse.json();

    let j = 0;
    for(let i = 0; i < weatherData.list.length; i += 8){
        const dateP = document.createElement("p");
        dateP.setAttribute("class", "weather-p");
        dateP.textContent = weatherData.list[i].dt_txt;
        dayArray[j].appendChild(dateP);

        const weatherP = document.createElement("p");
        weatherP.setAttribute("class", "weather-p");
        weatherP.textContent = weatherIcon(weatherData.list[i].weather[0].main);
        dayArray[j].appendChild(weatherP);

        const tempP = document.createElement("p");
        tempP.setAttribute("class", "weather-p");
        tempP.textContent = weatherData.list[i].main.temp;
        dayArray[j].appendChild(tempP);

        const humidityP = document.createElement("p");
        humidityP.setAttribute("class", "weather-p");
        humidityP.textContent = weatherData.list[i].main.humidity;
        dayArray[j].appendChild(humidityP);

        const windSpeedP = document.createElement("p");
        windSpeedP.setAttribute("class", "weather-p");
        windSpeedP.textContent = weatherData.list[i].wind.speed;
        dayArray[j].appendChild(windSpeedP);

        j++;
    }

    // for(let i = 0; i < weatherData.list.length; i += 8){
    //        console.log("Date: " + weatherData.list[i].dt_txt); 
    //        console.log("Weather: " + weatherData.list[i].weather[0].main); 
    //        console.log("Temp: " + weatherData.list[i].main.temp); 
    //        console.log("Humidity: " + weatherData.list[i].main.humidity); 
    //        console.log("Wind speed: " + weatherData.list[i].wind.speed); 
    // }
}

const collectSearchData = () => {
    let city = citySearch.value;
    let state = stateSearch.value; 
    let country = countrySearch.value;



    getWeatherData(city, state, country);
}




searchButton.addEventListener("click", collectSearchData);



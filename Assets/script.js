//API key = bd3136b1de02f5dec5a45d5eb3dea4e9
const citySearch = document.querySelector("#city-search");
const stateSearch = document.querySelector("#state-search");
const countrySearch = document.querySelector("#country-search");
const searchButton = document.querySelector("#search");
const clearButton =  document.querySelector("#clear");

const day0 = document.querySelector("#day0");
const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");
const day4 = document.querySelector("#day4");
let dayArray = [day0, day1, day2, day3, day4];

const pastSearches = document.querySelector("#past-searches");

const todayTitle = document.querySelector("#today-title");
const twoFromNow = document.querySelector("#two-from-now");
const threeFromNow = document.querySelector("#three-from-now");
const fourFromNow = document.querySelector("#four-from-now");
let now = dayjs();
let twoFromNowDay = now.add(2, 'day').format("dddd");
let threeFromNowDay = now.add(3, 'day').format("dddd");
let fourFromNowDay = now.add(4, 'day').format("dddd");
twoFromNow.textContent = twoFromNowDay;
threeFromNow.textContent = threeFromNowDay;
fourFromNow.textContent = fourFromNowDay;
let day1Date = now.format("M/DD/YYYY");
let day2Date = now.add(1, 'day').format("M/DD/YYYY");
let day3Date = now.add(2, 'day').format("M/DD/YYYY");
let day4Date = now.add(3, 'day').format("M/DD/YYYY");
let day5Date = now.add(4, 'day').format("M/DD/YYYY");
let dateArray = [day1Date, day2Date, day3Date, day4Date, day5Date];

const weatherIcon = (weather) => {
    let icon;
    switch(weather) {
        case "Thunderstorm":
            icon = "⚡"
            break;
        case "Sunny":
            icon = "🥵";
            break;
        case "Clouds":
            icon = "☁️";
            break;
        case "Rain":
            icon = "☔";
            break;
        case "Drizzle":
            icon = "☔";
            break;
        case "Clear":
            icon = "☀️"
            break;
        case "Windy":
            icon = "🌀"
            break;
        case "Snow":
            icon = "⛄️"
            break;
        default:
            icon = "☀️"
    }
    return icon;
}

//gets city, state, country; finds lat+lon; gets weather data for 5 days, displays them
const getWeatherData = async(city, state, country) => {
    for(let i = 0; i < dayArray.length; i++){
        while (dayArray[i].children[1]) {
            dayArray[i].removeChild(dayArray[i].children[1]);
        }
    }

    const getLatLonResponse= await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=bd3136b1de02f5dec5a45d5eb3dea4e9`);
    const latLonData = await getLatLonResponse.json();
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latLonData[0].lat}&lon=${latLonData[0].lon}&units=imperial&appid=bd3136b1de02f5dec5a45d5eb3dea4e9`);
    const weatherData = await weatherResponse.json();

    let j = 0;
    for(let i = 0; i < weatherData.list.length; i += 8){
        todayTitle.textContent = `Today in ${city}:`;

        const dateP = document.createElement("p");
        dateP.setAttribute("class", "weather-p");
        dateP.textContent = dateArray[j];
        dayArray[j].appendChild(dateP);

        const weatherP = document.createElement("p");
        weatherP.setAttribute("class", "weather-p");
        weatherP.textContent = weatherIcon(weatherData.list[i].weather[0].main);
        dayArray[j].appendChild(weatherP);

        const tempP = document.createElement("p");
        tempP.setAttribute("class", "weather-p");
        tempP.textContent = "Temp: " + weatherData.list[i].main.temp + "° F";
        dayArray[j].appendChild(tempP);

        const humidityP = document.createElement("p");
        humidityP.setAttribute("class", "weather-p");
        humidityP.textContent = "Humidity: " + weatherData.list[i].main.humidity;
        dayArray[j].appendChild(humidityP);

        const windSpeedP = document.createElement("p");
        windSpeedP.setAttribute("class", "weather-p");
        windSpeedP.textContent = "Wind speed: " + weatherData.list[i].wind.speed;
        dayArray[j].appendChild(windSpeedP);

        j++;
    }
}

//receive arrayOfCityArrays from storage if there is storage, or create that array if there isn't
const dataFromStorage = localStorage.getItem("localStorageData");
let arrayOfCityArrays;
if(dataFromStorage){
    arrayOfCityArrays = JSON.parse(dataFromStorage);
} else {
    arrayOfCityArrays = [];
}
//create buttons for city arrays in "array of city arrays"
let pastSearchButtonsArr = [];
for(let i = 0; i < arrayOfCityArrays.length; i++){
    let cityButton = document.createElement("button");
    cityButton.setAttribute("class", "past-search");
    cityButton.setAttribute("id", `button${i}`)
    if(arrayOfCityArrays[i][1]){
        cityButton.textContent = arrayOfCityArrays[i][0] + ", " + arrayOfCityArrays[i][1];
    } else {
        cityButton.textContent = arrayOfCityArrays[i][0] + ", " + arrayOfCityArrays[i][2];
    }
    pastSearches.appendChild(cityButton);
    pastSearchButtonsArr.push(cityButton);
}
if(arrayOfCityArrays){
    for(let i = 0; i < pastSearchButtonsArr.length; i++){
        pastSearchButtonsArr[i].addEventListener("click", function(){
            getWeatherData(arrayOfCityArrays[i][0], arrayOfCityArrays[i][1], arrayOfCityArrays[i][2]);
        })
    }   
}

const addPastSearch = (cityArray) => {
    let isIncluded = false;
    for(let i = 0; i < arrayOfCityArrays.length; i++){
        if(JSON.stringify(arrayOfCityArrays[i]) == JSON.stringify(cityArray)){
           isIncluded = true;
        }
    }
    if(!isIncluded){
        arrayOfCityArrays.push(cityArray);
    }

    while (pastSearches.firstChild) {
        pastSearches.removeChild(pastSearches.firstChild);
    }
    pastSearchButtonsArr = [];
    for(let i = 0; i < arrayOfCityArrays.length; i++){
        let cityButton = document.createElement("button");
        cityButton.setAttribute("class", "past-search");
        cityButton.setAttribute("id", `button${i}`)
        if(arrayOfCityArrays[i][1]){
            cityButton.textContent = arrayOfCityArrays[i][0] + ", " + arrayOfCityArrays[i][1];
        } else {
            cityButton.textContent = arrayOfCityArrays[i][0] + ", " + arrayOfCityArrays[i][2]
        }
        pastSearches.appendChild(cityButton);
        pastSearchButtonsArr.push(cityButton);
    }
    let stringifiedArray = JSON.stringify(arrayOfCityArrays);
    localStorage.setItem("localStorageData", stringifiedArray);
    for(let i = 0; i < pastSearchButtonsArr.length; i++){
        pastSearchButtonsArr[i].addEventListener("click", function(){
            getWeatherData(arrayOfCityArrays[i][0], arrayOfCityArrays[i][1], arrayOfCityArrays[i][2]);
        })
    }
}

const collectSearchData = () => {
    let cityArray = [];
    let city = citySearch.value.trim();
    let state = stateSearch.value.trim().toUpperCase(); 
    let country = countrySearch.value.trim().toUpperCase();

    cityArray.push(city);
    cityArray.push(state);
    cityArray.push(country);
    addPastSearch(cityArray);

    getWeatherData(city, state, country);

    citySearch.value = "";
    stateSearch.value = "";
    countrySearch.value = "";
}

const clearPastSearches = () => {
    localStorage.clear();
    arrayOfCityArrays = [];
    while (pastSearches.firstChild) {
        pastSearches.removeChild(pastSearches.firstChild);
    }
}

searchButton.addEventListener("click", collectSearchData);
clearButton.addEventListener("click", clearPastSearches);



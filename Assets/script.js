//API key = bd3136b1de02f5dec5a45d5eb3dea4e9
//Displayed per city: Date, Icon representing weather, temp, humidity, wind speed



const getWeatherData = async(city, state, country) => {
    const getLatLonResponse= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=bd3136b1de02f5dec5a45d5eb3dea4e9`);
    const latLonData = await getLatLonResponse.json();
    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latLonData[0].lat}&lon=${latLonData[0].lon}&units=imperial&appid=bd3136b1de02f5dec5a45d5eb3dea4e9`);
    const weatherData = await weatherResponse.json();
    let weatherArray = [];
    for(let i = 0; i < weatherData.list.length; i += 8){
           console.log("Date: " + weatherData.list[i].dt_txt); 
           console.log("Weather: " + weatherData.list[i].weather[0].main); 
           console.log("Temp: " + weatherData.list[i].main.temp); 
           console.log("Humidity: " + weatherData.list[i].main.humidity); 
           console.log("Wind speed: " + weatherData.list[i].wind.speed); 
    }
}

let city = "Raleigh";
let state = "NC"; 
let country = "US";

getWeatherData(city, state, country);



//API key = bd3136b1de02f5dec5a45d5eb3dea4e9
//API url: 

let city = "Raleigh, NC";
let state = "NC"; 
let country = "US"

const getLatLon = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    let latLon = [data[0].lat, data[0].lon];
    return latLon;
}

const latLon = getLatLon(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=bd3136b1de02f5dec5a45d5eb3dea4e9`);

const getWeatherData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}


getWeatherData(`http://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0]}&lon=${latLon[1]}&appid=bd3136b1de02f5dec5a45d5eb3dea4e9`);


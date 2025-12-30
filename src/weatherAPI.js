// const fetch = require('node-fetch');

const getweatherAPI = async (city) => {
    const location = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const locationData = await location.json();
    // console.log(locationData);
    const latitude = locationData.results[0].latitude;
    const longitude = locationData.results[0].longitude;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await response.json();
        console.log(data);
    
    // return data;
}

getweatherAPI('london');
// module.exports = weatherAPI;
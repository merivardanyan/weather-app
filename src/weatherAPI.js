const getweatherAPI = async (city) => {
    const location = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const locationData = await location.json();
    // console.log(locationData);
    if (locationData.results.length === 0 || !locationData.results) {
        throw new Error('City not found');
    }
    const {latitude,longitude} = locationData.results[0];
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await response.json();
        // console.log(data);
    return data.current_weather;
}
module.exports = { getweatherAPI };
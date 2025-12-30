const db = require('./db');
const { getweatherAPI } = require('./weatherAPI');
const runWeatherAPI = async () => {
    // console.log(7)
    db.all('SELECT * FROM weather_data', async (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        for (const city of data) {
            try {
                const weatherData = await getweatherAPI(city.city);
                db.run('INSERT INTO weather_data (city, temperature, windspeed) VALUES (?, ?, ?)', [city.name, weatherData.temperature, weatherData.windspeed]);
            } catch (error) {
                console.log(error);
            }
        }
    });
}
runWeatherAPI();
setInterval(runWeatherAPI, 600000);
module.exports = { runWeatherAPI };

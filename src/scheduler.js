const db = require('./db');
const { getweatherAPI } = require('./weatherAPI');

const runWeatherAPI = async () => {
    db.all('SELECT DISTINCT city FROM weather_data', async (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // console.log(data)
        for (const row of data) {
            try {
                const weatherData = await getweatherAPI(row.city);
                db.run('INSERT INTO weather_data (city, temperature, windspeed) VALUES (?, ?, ?)', [row.city, weatherData.temperature, weatherData.windspeed]);
            } catch (error) {
                console.log(error);
            }
        }
    });
}
runWeatherAPI();
setInterval(runWeatherAPI, 600000);
module.exports = { runWeatherAPI };

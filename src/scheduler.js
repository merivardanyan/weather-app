const db = require('./db');
const { getweatherAPI } = require('./weatherAPI');

const runWeatherAPI = async () => {
    db.all('SELECT * FROM weather_data', async (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // console.log(data)
        for (const raw of data) {
            try {
                const weatherData = await getweatherAPI(raw.city);
                db.run('INSERT INTO weather_data (city, temperature, windspeed) VALUES (?, ?, ?)', [raw.city, weatherData.temperature, weatherData.windspeed]);
            } catch (error) {
                console.log(error);
            }
        }
    });
}
runWeatherAPI();
setInterval(runWeatherAPI, 600000);
module.exports = { runWeatherAPI };

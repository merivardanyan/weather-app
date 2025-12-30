const express = require('express');
const db = require('./db');

const router = express.Router();

router.get('/weather/raw', async (req, res) => {
    const {city, from, to} = req.query;
    if(!city) return res.status(400).json({error: 'City is required'});
    let sql = 'SELECT getched_at, temperature, windspeed FROM weather_data WHERE city = ?';
    const params = [city];
    if(from){
        sql += ' AND fetched_at >= ?';
        params.push(from);
    }
    if(to){
        sql += ' AND fetched_at <= ?';
        params.push(to);
    }
    db.all(sql,params, (err, data) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(data);
    });
});

router.get('/weather/avarage', async (req, res) => {
   const {city, from, to} = req.query;
   if(!city) return res.status(400).json({error: 'City is required'});
   let sql = 'SELECT city, COUNT(*) as count, AVG(temperature) as avg_temperature, AVG(windspeed) as avg_windspeed, fetched_at FROM weather_data WHERE city = ?';
   const params = [city];
   if(from){
       sql += ' AND fetched_at >= ?';
       params.push(from);
   }
   if(to){
       sql += ' AND fetched_at <= ?';
       params.push(to);
   }

   sql+= ' GROUP BY city';
   
   db.get(sql,params, (err, data) => {
       if(err) return res.status(500).json({error: err.message});
       res.json(data);
   });
});

router.post('/cities', async (req, res) => {
    const {city} = req.body;
    if(!city) return res.status(400).json({error: 'City is required'});
    db.run('INSERT INTO weather_data (city) VALUES (?)', [city], (err, data) => {
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({message: 'City added',city});
    });

});

module.exports = router;
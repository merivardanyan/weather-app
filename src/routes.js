const express = require('express');
const db = require('./db');

const router = express.Router();

router.get('/now', async (req, res) => {
    const {city, from, to} = req.query;
    if(!city) return res.status(400).json({error: 'City is required'});
    let sql = 'SELECT * FROM weather_data WHERE city = ?';
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

router.get('/avarage', async (req, res) => {
   const {city, from, to} = req.query;
   if(!city) return res.status(400).json({error: 'City is required'});
   let sql = 'SELECT city, AVG(temperature) as avg_temperature, AVG(windspeed) as avg_windspeed FROM weather_data WHERE city = ?';
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

module.exports = router;
const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');
const cache = require('../cache/cacheStore');
const logger = require('../utils/logger');

router.get('/:city', async (req, res) => {
    const city = req.params.city;
    const key = `weather_${city.toLowerCase()}`;
    
    const cached = cache.get(key);
    if (cached) {
        logger.logHit('WEATHER', `Weather specifically fetched for [${cached.city}]`);
        return res.json({ ...cached, servedFrom: 'Cache' });
    }
    
    try {
        const data = await weatherService.fetchWeather(city);
        cache.set(key, data, 300000); // 5 minutes TTL
        logger.logMiss('WEATHER', `Weather specifically fetched for [${data.city}]`);
        res.json({ ...data, servedFrom: 'Fresh Data' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

module.exports = router;

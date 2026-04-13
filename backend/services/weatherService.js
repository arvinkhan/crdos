const axios = require('axios');

async function fetchWeather(city) {
    try {
        // Step 1: Resolve city to coordinates using Open-Meteo Geocoding
        const geoRes = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        if (!geoRes.data.results || geoRes.data.results.length === 0) {
            throw new Error("City not found");
        }
        const { latitude, longitude, name, country } = geoRes.data.results[0];
        
        // Step 2: Fetch current weather for coordinates
        const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`);
        
        const current = weatherRes.data.current;
        
        // Map WMO weather codes to human string
        let condition = "Clear Sunny";
        if(current.weather_code > 0) condition = "Partly Cloudy";
        if(current.weather_code > 3) condition = "Cloudy / Overcast";
        if(current.weather_code > 50) condition = "Rainy / Showers";
        if(current.weather_code > 70) condition = "Snow";

        return {
            city: name,
            country: country,
            temperature: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            condition: condition
        };
    } catch (error) {
        if (error.message === "City not found") throw error;
        throw new Error("External Weather API unavailable");
    }
}

module.exports = { fetchWeather };

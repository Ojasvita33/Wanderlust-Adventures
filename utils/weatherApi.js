// Weather API utility for Wanderlust Adventures
const axios = require('axios');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
/**
 * Fetch current weather for a city
 * @param {string} cityName
 * @returns {Promise<Object>} Weather data
 */
async function getWeather(cityName) {
    try {
        console.log('Weather API Debug:', {
            apiKey: OPENWEATHER_API_KEY,
            city: cityName
        });
        const response = await axios.get(BASE_URL, {
            params: {
                q: cityName,
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Weather API error:', error.message);
        if (error.response) {
            console.error('Weather API response:', error.response.data);
        }
        return null;
    }
}

module.exports = { getWeather };

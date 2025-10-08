// Public Holidays API utility for Wanderlust Adventures
const axios = require('axios');

const HOLIDAYS_API_KEY = process.env.HOLIDAYS_API_KEY;
const BASE_URL = 'https://calendarific.com/api/v2/holidays';

async function getPublicHolidays(countryCode = 'IN', year = new Date().getFullYear()) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_key: HOLIDAYS_API_KEY,
                country: countryCode,
                year: year
            }
        });
        return response.data;
    } catch (error) {
        console.error('Public Holidays API error:', error.message);
        if (error.response) {
            console.error('Public Holidays API response:', error.response.data);
        }
        return null;
    }
}

module.exports = { getPublicHolidays };

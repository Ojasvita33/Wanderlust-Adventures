// Currency Exchange API utility for Wanderlust Adventures
const axios = require('axios');

const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

/**
 * Fetch exchange rates for a base currency
 * @param {string} baseCurrency (e.g., 'INR', 'USD')
 * @returns {Promise<Object>} Exchange rates data
 */
async function getExchangeRates(baseCurrency = 'INR') {
    try {
        const url = `${BASE_URL}/${EXCHANGE_API_KEY}/latest/${baseCurrency}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Exchange API error:', error.message);
        if (error.response) {
            console.error('Exchange API response:', error.response.data);
        }
        return null;
    }
}

module.exports = { getExchangeRates };

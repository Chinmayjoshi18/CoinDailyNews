/**
 * API endpoint for cryptocurrency price data
 * 
 * This endpoint provides real-time and historical cryptocurrency price data:
 * - GET: Retrieve current prices for specified cryptocurrencies
 */

import withErrorHandling, { ApiError, methodHandler } from '../middleware/withErrorHandling';

// Sample cryptocurrency price data to simulate an external API response
const cryptoPriceData = {
  bitcoin: {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 57832.45,
    market_cap: 1089234567890,
    market_cap_rank: 1,
    price_change_percentage_24h: 2.34,
    price_change_percentage_7d: 5.67,
    price_change_percentage_30d: -3.21,
    circulating_supply: 18845000,
    max_supply: 21000000,
    ath: 69000,
    ath_date: '2021-11-10T14:24:11.849Z',
    last_updated: '2023-03-15T10:30:00Z'
  },
  ethereum: {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 3245.78,
    market_cap: 389234567890,
    market_cap_rank: 2,
    price_change_percentage_24h: 1.23,
    price_change_percentage_7d: 3.45,
    price_change_percentage_30d: -2.10,
    circulating_supply: 120250000,
    max_supply: null,
    ath: 4878.26,
    ath_date: '2021-11-10T14:24:19.604Z',
    last_updated: '2023-03-15T10:30:00Z'
  },
  cardano: {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    current_price: 0.5432,
    market_cap: 18923456789,
    market_cap_rank: 7,
    price_change_percentage_24h: -0.98,
    price_change_percentage_7d: 2.34,
    price_change_percentage_30d: -5.67,
    circulating_supply: 35045020830,
    max_supply: 45000000000,
    ath: 3.09,
    ath_date: '2021-09-02T06:00:10.474Z',
    last_updated: '2023-03-15T10:30:00Z'
  }
};

/**
 * Handle GET request to retrieve cryptocurrency prices
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetPrices(req, res) {
  // Extract query parameters
  const { coins, currency = 'usd', include_24h_change = 'true' } = req.query;
  
  let result = {};
  
  // If specific coins are requested, filter the data
  if (coins) {
    const coinList = coins.split(',');
    
    coinList.forEach(coin => {
      const coinId = coin.toLowerCase().trim();
      
      if (cryptoPriceData[coinId]) {
        result[coinId] = cryptoPriceData[coinId];
      } else {
        // In a real application, we might want to fetch this from an external API
        // For now, we'll throw an error if the coin is not in our sample data
        throw new ApiError(`Price data for ${coin} not available`, 404);
      }
    });
  } else {
    // If no specific coins are requested, return all available data
    result = cryptoPriceData;
  }
  
  // Filter out fields based on query parameters
  if (include_24h_change !== 'true') {
    Object.keys(result).forEach(coin => {
      const { price_change_percentage_24h, ...rest } = result[coin];
      result[coin] = rest;
    });
  }
  
  // In a real application:
  // 1. Fetch real-time data from CoinGecko, CoinMarketCap, or another API
  // 2. Convert prices to the requested currency if not USD
  // 3. Implement caching to avoid rate limits
  
  return res.status(200).json({
    success: true,
    currency: currency.toLowerCase(),
    data: result,
    last_updated: new Date().toISOString()
  });
}

/**
 * Handle POST request for historical price data
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleHistoricalData(req, res) {
  const { coin, days = 7 } = req.body;
  
  if (!coin) {
    throw new ApiError('Coin parameter is required', 400);
  }
  
  const coinId = coin.toLowerCase().trim();
  
  if (!cryptoPriceData[coinId]) {
    throw new ApiError(`Historical data for ${coin} not available`, 404);
  }
  
  // Generate mock historical data
  const historicalData = [];
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * msPerDay);
    
    // Generate a somewhat realistic price based on current price with some randomness
    const basePrice = cryptoPriceData[coinId].current_price;
    const randomFactor = 0.95 + (Math.random() * 0.1); // Random factor between 0.95 and 1.05
    const price = basePrice * randomFactor;
    
    historicalData.push({
      timestamp: date.toISOString(),
      price: price.toFixed(2)
    });
  }
  
  // In a real application:
  // 1. Fetch historical data from an external API
  // 2. Implement caching for frequently requested data
  
  return res.status(200).json({
    success: true,
    coin: coinId,
    days: parseInt(days),
    data: historicalData
  });
}

// Export the handler with route handlers for each HTTP method and error handling middleware
export default withErrorHandling(
  async function priceTicker(req, res) {
    return methodHandler({
      GET: handleGetPrices,
      POST: handleHistoricalData
    })(req, res);
  }
);
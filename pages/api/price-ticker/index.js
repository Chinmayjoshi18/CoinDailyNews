/**
 * API endpoint for cryptocurrency price data
 * 
 * This endpoint simulates integration with cryptocurrency price APIs like CoinGecko:
 * - GET: Retrieve current prices for specified cryptocurrencies
 * 
 * In a production environment, this would connect to an actual price API
 * with proper caching mechanisms to avoid rate limiting.
 */

// Mock cryptocurrency price data
const mockPriceData = {
  bitcoin: {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 41235.67,
    market_cap: 830456321890,
    market_cap_rank: 1,
    total_volume: 24567890123,
    price_change_percentage_24h: 2.45,
    price_change_percentage_7d: 5.32,
    last_updated: new Date().toISOString()
  },
  ethereum: {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 2356.78,
    market_cap: 289756321456,
    market_cap_rank: 2,
    total_volume: 16784532198,
    price_change_percentage_24h: 3.21,
    price_change_percentage_7d: 8.76,
    last_updated: new Date().toISOString()
  },
  binancecoin: {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'Binance Coin',
    current_price: 345.98,
    market_cap: 56784123456,
    market_cap_rank: 3,
    total_volume: 2345678901,
    price_change_percentage_24h: 1.23,
    price_change_percentage_7d: 4.56,
    last_updated: new Date().toISOString()
  },
  cardano: {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    current_price: 0.45,
    market_cap: 14567890123,
    market_cap_rank: 8,
    total_volume: 789012345,
    price_change_percentage_24h: -1.23,
    price_change_percentage_7d: 2.34,
    last_updated: new Date().toISOString()
  },
  solana: {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    current_price: 98.76,
    market_cap: 34567890123,
    market_cap_rank: 5,
    total_volume: 1234567890,
    price_change_percentage_24h: 4.56,
    price_change_percentage_7d: 12.34,
    last_updated: new Date().toISOString()
  },
  ripple: {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    current_price: 0.56,
    market_cap: 28901234567,
    market_cap_rank: 6,
    total_volume: 1987654321,
    price_change_percentage_24h: 0.98,
    price_change_percentage_7d: 3.45,
    last_updated: new Date().toISOString()
  },
  polkadot: {
    id: 'polkadot',
    symbol: 'dot',
    name: 'Polkadot',
    current_price: 5.67,
    market_cap: 6789012345,
    market_cap_rank: 11,
    total_volume: 456789012,
    price_change_percentage_24h: -2.34,
    price_change_percentage_7d: -1.23,
    last_updated: new Date().toISOString()
  },
  dogecoin: {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    current_price: 0.078,
    market_cap: 10789012345,
    market_cap_rank: 9,
    total_volume: 567890123,
    price_change_percentage_24h: 5.67,
    price_change_percentage_7d: 10.98,
    last_updated: new Date().toISOString()
  }
};

/**
 * Add random price fluctuations to simulate real-time data
 * 
 * @param {Object} priceData - The base price data to modify
 * @returns {Object} Updated price data with slight variations
 */
function addPriceFluctuations(priceData) {
  const updatedData = { ...priceData };
  
  // Update the timestamp
  updatedData.last_updated = new Date().toISOString();
  
  // Add a small random fluctuation to the price (±2%)
  const fluctuation = 1 + (Math.random() * 0.04 - 0.02);
  updatedData.current_price = +(priceData.current_price * fluctuation).toFixed(
    priceData.current_price < 1 ? 4 : 2
  );
  
  // Update price change percentages
  const priceChangeFluctuation = Math.random() * 1 - 0.5;
  updatedData.price_change_percentage_24h = +(priceData.price_change_percentage_24h + priceChangeFluctuation).toFixed(2);
  
  return updatedData;
}

/**
 * Handle HTTP requests for cryptocurrency price data
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
export default function handler(req, res) {
  const { method } = req;
  
  try {
    if (method === 'GET') {
      return handleGetPrices(req, res);
    }
    
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ 
      success: false, 
      error: `Method ${method} Not Allowed` 
    });
  } catch (error) {
    console.error('Price Ticker API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing price data request',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Handle GET request to retrieve cryptocurrency prices
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetPrices(req, res) {
  // Extract query parameters
  const { ids, vs_currency = 'usd', include_market_data = 'true' } = req.query;
  
  // Parse comma-separated IDs or use all available coins
  const coinIds = ids ? ids.split(',') : Object.keys(mockPriceData);
  
  // Filter prices by requested IDs
  const filteredPrices = coinIds.reduce((result, id) => {
    if (mockPriceData[id]) {
      // Add price fluctuations to simulate real-time data
      result[id] = addPriceFluctuations(mockPriceData[id]);
      
      // If market data is not requested, remove those fields
      if (include_market_data !== 'true') {
        const { 
          id: coinId, 
          symbol, 
          name, 
          current_price, 
          price_change_percentage_24h,
          last_updated
        } = result[id];
        
        result[id] = { 
          id: coinId, 
          symbol, 
          name, 
          current_price, 
          price_change_percentage_24h,
          last_updated
        };
      }
    }
    return result;
  }, {});
  
  // Handle case when no valid coins are found
  if (Object.keys(filteredPrices).length === 0) {
    return res.status(404).json({
      success: false,
      error: 'No cryptocurrency data found for the specified IDs'
    });
  }
  
  // Return price data
  return res.status(200).json({
    success: true,
    data: filteredPrices,
    meta: {
      count: Object.keys(filteredPrices).length,
      vs_currency: vs_currency,
      last_updated: new Date().toISOString()
    }
  });
}
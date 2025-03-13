import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * PriceTicker component displays live cryptocurrency prices in a scrolling ticker
 * Fetches data from an API and updates periodically
 * 
 * @returns {JSX.Element} The price ticker component
 */
export default function PriceTicker() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch cryptocurrency data
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, you would use your API key from environment variables
        // This is a placeholder function to simulate fetching data
        // const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
        // const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        //   params: {
        //     vs_currency: 'usd',
        //     order: 'market_cap_desc',
        //     per_page: 20,
        //     page: 1,
        //     sparkline: false,
        //     x_cg_demo_api_key: apiKey
        //   }
        // });
        
        // For demonstration, using mock data
        const mockData = [
          { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 46750.52, price_change_percentage_24h: 2.75 },
          { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 2456.78, price_change_percentage_24h: 1.32 },
          { id: 'binancecoin', symbol: 'bnb', name: 'Binance Coin', current_price: 320.45, price_change_percentage_24h: -0.75 },
          { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 1.18, price_change_percentage_24h: 3.42 },
          { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 98.76, price_change_percentage_24h: 5.21 },
          { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 0.75, price_change_percentage_24h: -1.24 },
          { id: 'polkadot', symbol: 'dot', name: 'Polkadot', current_price: 23.45, price_change_percentage_24h: 0.98 },
          { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', current_price: 0.124, price_change_percentage_24h: 7.65 },
          { id: 'avalanche', symbol: 'avax', name: 'Avalanche', current_price: 32.87, price_change_percentage_24h: 4.32 },
          { id: 'chainlink', symbol: 'link', name: 'Chainlink', current_price: 17.93, price_change_percentage_24h: 2.18 },
        ];
        
        setCryptoData(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchCryptoData();

    // Set up interval to fetch data periodically (every 5 minutes)
    const intervalId = setInterval(fetchCryptoData, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format price with thousands separators
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="bg-slate-800 py-2 text-white">
        <div className="container">
          <div className="flex justify-center items-center">
            <span className="text-gray-300">Loading cryptocurrency prices...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800 py-2 text-white">
        <div className="container">
          <div className="flex justify-center items-center">
            <span className="text-red-400">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 py-2 text-white overflow-hidden">
      <div className="ticker-wrapper">
        <div className="ticker">
          {cryptoData.map((crypto) => (
            <div
              key={crypto.id}
              className="inline-flex items-center mx-4"
            >
              <span className="font-medium text-sm">{crypto.name}</span>
              <span className="ml-1 text-sm text-gray-300">({crypto.symbol.toUpperCase()})</span>
              <span className="ml-2 font-semibold text-sm">{formatPrice(crypto.current_price)}</span>
              <span
                className={`ml-2 text-xs ${
                  crypto.price_change_percentage_24h >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ))}
          
          {/* Duplicate the items to create a seamless loop */}
          {cryptoData.map((crypto) => (
            <div
              key={`${crypto.id}-dup`}
              className="inline-flex items-center mx-4"
            >
              <span className="font-medium text-sm">{crypto.name}</span>
              <span className="ml-1 text-sm text-gray-300">({crypto.symbol.toUpperCase()})</span>
              <span className="ml-2 font-semibold text-sm">{formatPrice(crypto.current_price)}</span>
              <span
                className={`ml-2 text-xs ${
                  crypto.price_change_percentage_24h >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
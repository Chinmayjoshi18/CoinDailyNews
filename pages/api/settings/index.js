/**
 * API endpoint for website settings operations
 * 
 * This endpoint handles operations for website configuration:
 * - GET: Retrieve current website settings
 * - PUT: Update website settings
 */

import withErrorHandling, { methodHandler } from '../middleware/withErrorHandling';

// Sample website settings data to simulate a database
const websiteSettingsData = {
  siteName: 'CoinDailyNews',
  tagline: 'Your Daily Source for Cryptocurrency News and Analysis',
  description: 'CoinDailyNews provides the latest cryptocurrency news, market analysis, and blockchain technology updates for crypto enthusiasts and investors.',
  logo: '/images/logo.svg',
  favicon: '/images/favicon.ico',
  themeColor: '#1976D2',
  accentColor: '#FF9800',
  contactEmail: 'info@coindailynews.com',
  socialLinks: {
    twitter: 'https://twitter.com/coindailynews',
    facebook: 'https://facebook.com/coindailynews',
    telegram: 'https://t.me/coindailynews',
    discord: 'https://discord.gg/coindailynews'
  },
  footerText: '© 2023 CoinDailyNews. All rights reserved.',
  analyticsId: 'UA-123456789-1',
  featuredCategories: ['market-analysis', 'blockchain', 'regulation'],
  adsEnabled: true,
  maintenanceMode: false,
  apiKeys: {
    coinMarketCap: process.env.COIN_MARKET_CAP_API_KEY || 'sample-api-key',
    coinGecko: process.env.COIN_GECKO_API_KEY || 'sample-api-key'
  },
  seo: {
    metaTitle: 'CoinDailyNews - Cryptocurrency News and Analysis',
    metaDescription: 'Stay updated with the latest cryptocurrency news, market trends, and blockchain technology developments.',
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@coindailynews'
  }
};

/**
 * Handle GET request to retrieve website settings
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetSettings(req, res) {
  // Create a copy of settings without sensitive information
  const publicSettings = { ...websiteSettingsData };
  
  // Remove sensitive information like API keys
  delete publicSettings.apiKeys;
  
  return res.status(200).json({
    success: true,
    data: publicSettings
  });
}

/**
 * Handle PUT request to update website settings
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleUpdateSettings(req, res) {
  const updatedData = req.body;
  
  // In a real application:
  // 1. Validate the settings data
  // 2. Check user permissions (admin only)
  // 3. Update only allowed fields
  
  // Create updated settings by merging original with updates
  const updatedSettings = {
    ...websiteSettingsData,
    ...updatedData,
    // Preserve sensitive information like API keys
    apiKeys: websiteSettingsData.apiKeys
  };
  
  // In a real application, save the updated settings to the database
  
  // Return the updated settings without sensitive information
  const publicSettings = { ...updatedSettings };
  delete publicSettings.apiKeys;
  
  return res.status(200).json({
    success: true,
    message: 'Website settings updated successfully',
    data: publicSettings
  });
}

// Export the handler with route handlers for each HTTP method and error handling middleware
export default withErrorHandling(
  async function settingsHandler(req, res) {
    return methodHandler({
      GET: handleGetSettings,
      PUT: handleUpdateSettings
    })(req, res);
  }
);
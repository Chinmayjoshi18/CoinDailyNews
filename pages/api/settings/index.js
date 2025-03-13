/**
 * API endpoint for website settings operations
 * 
 * This endpoint handles operations for site-wide settings:
 * - GET: Retrieve current website settings
 * - PUT: Update website settings
 */

// Default website settings to simulate a database
const defaultSettings = {
  site: {
    name: 'CoinDailyNews',
    tagline: 'Your trusted source for cryptocurrency news and analysis',
    description: 'CoinDailyNews provides the latest cryptocurrency news, market analysis, and educational content to help you navigate the digital asset ecosystem.',
    logoUrl: '/images/logo.png',
    faviconUrl: '/images/favicon.ico',
    themeColor: '#3498db'
  },
  meta: {
    title: 'CoinDailyNews - Cryptocurrency News and Analysis',
    description: 'Stay updated with the latest cryptocurrency news, price analysis, and blockchain technology developments.',
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@coindailynews',
    keywords: 'cryptocurrency, bitcoin, ethereum, blockchain, crypto news, defi, nft'
  },
  social: {
    twitter: 'https://twitter.com/coindailynews',
    facebook: 'https://facebook.com/coindailynews',
    telegram: 'https://t.me/coindailynews',
    discord: 'https://discord.gg/coindailynews',
    youtube: 'https://youtube.com/coindailynews'
  },
  footer: {
    copyrightText: '© 2023 CoinDailyNews. All rights reserved.',
    showSocialLinks: true,
    showCategoriesInFooter: true,
    disclaimerText: 'Information provided on this website is for general information purposes only. It should not be considered financial advice.'
  },
  features: {
    darkModeEnabled: true,
    newsletterEnabled: true,
    commentsEnabled: true,
    priceTicker: {
      enabled: true,
      coins: ['bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana'],
      refreshInterval: 60
    }
  },
  analytics: {
    googleAnalyticsId: '',
    facebookPixelId: '',
    hotjarId: ''
  }
};

// Keep a working copy of settings that can be modified by the API
let currentSettings = { ...defaultSettings };

/**
 * Handle HTTP requests for website settings
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
export default function handler(req, res) {
  const { method } = req;
  
  try {
    switch (method) {
      case 'GET':
        return handleGetSettings(req, res);
      case 'PUT':
        return handleUpdateSettings(req, res);
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ 
          success: false, 
          error: `Method ${method} Not Allowed` 
        });
    }
  } catch (error) {
    console.error('Settings API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing settings request',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Handle GET request to retrieve website settings
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetSettings(req, res) {
  // Extract query parameter for filtering specific section of settings
  const { section } = req.query;
  
  if (section && currentSettings[section]) {
    // Return only the requested section
    return res.status(200).json({
      success: true,
      data: {
        [section]: currentSettings[section]
      }
    });
  }
  
  // Return all settings if no section specified or if specified section doesn't exist
  return res.status(200).json({
    success: true,
    data: currentSettings
  });
}

/**
 * Handle PUT request to update website settings
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleUpdateSettings(req, res) {
  const updates = req.body;
  
  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      error: 'No settings provided for update'
    });
  }
  
  // Validate updates (basic validation example)
  if (updates.site && typeof updates.site.name === 'string' && updates.site.name.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Site name cannot be empty',
      field: 'site.name'
    });
  }
  
  // Deep merge the updates with current settings
  const mergeDeep = (target, source) => {
    const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
    
    if (!isObject(target) || !isObject(source)) {
      return source;
    }
    
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
    
    return target;
  };
  
  // Apply updates
  currentSettings = mergeDeep({ ...currentSettings }, updates);
  
  // In a real application, save the updated settings to a database or configuration file
  
  return res.status(200).json({
    success: true,
    message: 'Settings updated successfully',
    data: currentSettings
  });
}
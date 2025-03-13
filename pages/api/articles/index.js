/**
 * API endpoint for article operations
 * 
 * This endpoint handles CRUD operations for articles:
 * - GET: Retrieve articles with optional filtering
 * - POST: Create a new article
 * - PUT: Not implemented at the index level (use /api/articles/[id])
 * - DELETE: Not implemented at the index level (use /api/articles/[id])
 */

// Sample article data to simulate a database
const articlesData = [
  {
    id: '1',
    title: 'Bitcoin Surges Past $60,000 as Institutional Adoption Increases',
    slug: 'bitcoin-surges-past-60000',
    content: 'Bitcoin has reached new heights as more institutional investors add the cryptocurrency to their portfolios...',
    excerpt: 'The leading cryptocurrency continues its bullish trend amid growing institutional interest.',
    category: 'market-analysis',
    author: 'John Crypto',
    publishedAt: '2023-03-15T10:30:00Z',
    featuredImage: '/images/articles/bitcoin-surge.jpg',
    tags: ['bitcoin', 'price', 'institutional-investors'],
    status: 'published',
    metaDescription: 'Bitcoin breaks $60,000 as institutional adoption grows and market sentiment remains bullish.'
  },
  {
    id: '2',
    title: 'Ethereum 2.0 Upgrade Timeline: What You Need to Know',
    slug: 'ethereum-2-upgrade-timeline',
    content: 'The much-anticipated Ethereum 2.0, also known as Eth2 or "Serenity," represents a significant upgrade to the Ethereum network...',
    excerpt: 'Learn about the upcoming phases of Ethereum\'s transition to proof-of-stake.',
    category: 'blockchain',
    author: 'Sarah Blockchain',
    publishedAt: '2023-03-10T14:15:00Z',
    featuredImage: '/images/articles/ethereum-upgrade.jpg',
    tags: ['ethereum', 'eth2', 'blockchain'],
    status: 'published',
    metaDescription: 'A comprehensive breakdown of Ethereum 2.0\'s upgrade timeline and what it means for developers and investors.'
  }
];

/**
 * Handle HTTP requests for article management
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
export default function handler(req, res) {
  // Extract query parameters for filtering
  const { method } = req;
  
  try {
    switch (method) {
      case 'GET':
        return handleGetArticles(req, res);
      case 'POST':
        return handleCreateArticle(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ 
          success: false, 
          error: `Method ${method} Not Allowed` 
        });
    }
  } catch (error) {
    console.error('Articles API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing article request',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Handle GET requests to retrieve articles
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetArticles(req, res) {
  // Extract query parameters for filtering
  const { 
    category,
    tag,
    status = 'published',
    author,
    limit = 10,
    offset = 0,
    sort = 'publishedAt',
    order = 'desc'
  } = req.query;

  // Filter articles based on query parameters (simulating database queries)
  let filteredArticles = [...articlesData];
  
  if (category) {
    filteredArticles = filteredArticles.filter(article => article.category === category);
  }
  
  if (tag) {
    filteredArticles = filteredArticles.filter(article => article.tags.includes(tag));
  }
  
  if (status) {
    filteredArticles = filteredArticles.filter(article => article.status === status);
  }
  
  if (author) {
    filteredArticles = filteredArticles.filter(article => article.author === author);
  }
  
  // Sort articles
  filteredArticles.sort((a, b) => {
    if (order.toLowerCase() === 'asc') {
      return a[sort] > b[sort] ? 1 : -1;
    } else {
      return a[sort] < b[sort] ? 1 : -1;
    }
  });
  
  // Apply pagination
  const paginatedArticles = filteredArticles.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  // Return paginated results with metadata
  return res.status(200).json({
    success: true,
    count: paginatedArticles.length,
    total: filteredArticles.length,
    data: paginatedArticles,
    pagination: {
      limit: parseInt(limit),
      offset: parseInt(offset),
      total: filteredArticles.length,
      totalPages: Math.ceil(filteredArticles.length / parseInt(limit)),
      currentPage: Math.floor(parseInt(offset) / parseInt(limit)) + 1
    }
  });
}

/**
 * Handle POST requests to create a new article
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleCreateArticle(req, res) {
  const article = req.body;
  
  // Validate required fields
  const requiredFields = ['title', 'content', 'category', 'author'];
  const missingFields = requiredFields.filter(field => !article[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      missingFields
    });
  }
  
  // Create a new article with generated ID (in a real app, this would be handled by the database)
  const newArticle = {
    id: (articlesData.length + 1).toString(),
    slug: article.slug || article.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
    status: article.status || 'draft',
    publishedAt: article.status === 'published' ? new Date().toISOString() : null,
    ...article
  };
  
  // In a real app, this would insert the article into a database
  // For this example, we'll just simulate a successful creation
  
  return res.status(201).json({
    success: true,
    message: 'Article created successfully',
    data: newArticle
  });
}
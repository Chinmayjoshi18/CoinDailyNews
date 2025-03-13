/**
 * API endpoint for operations on a specific article
 * 
 * This endpoint handles operations for a single article identified by ID:
 * - GET: Retrieve a specific article
 * - PUT: Update a specific article
 * - DELETE: Delete a specific article
 */

// Sample article data to simulate a database (same as in index.js)
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
 * Handle HTTP requests for specific article by ID
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
export default function articleHandler(req, res) {
  const { 
    query: { id },
    method 
  } = req;

  try {
    // Find the article by ID
    const article = articlesData.find(article => article.id === id);
    
    // If article doesn't exist, return 404
    if (!article) {
      return res.status(404).json({ 
        success: false, 
        error: `Article with ID ${id} not found` 
      });
    }
    
    // Process based on HTTP method
    switch (method) {
      case 'GET':
        return handleGetArticle(article, res);
      case 'PUT':
        return handleUpdateArticle(article, req, res);
      case 'DELETE':
        return handleDeleteArticle(id, res);
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ 
          success: false, 
          error: `Method ${method} Not Allowed` 
        });
    }
  } catch (error) {
    console.error('Article API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing article request',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Handle GET request to retrieve a specific article
 * 
 * @param {Object} article - The article to return
 * @param {Object} res - Next.js response object
 */
function handleGetArticle(article, res) {
  return res.status(200).json({
    success: true,
    data: article
  });
}

/**
 * Handle PUT request to update a specific article
 * 
 * @param {Object} article - The original article to update
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleUpdateArticle(article, req, res) {
  const updatedData = req.body;
  
  // In a real application, validate the update data here
  
  // Create updated article by merging original with updates
  const updatedArticle = {
    ...article,
    ...updatedData,
    // Preserve the original ID
    id: article.id
  };
  
  // If changing status from draft to published, update publishedAt
  if (article.status === 'draft' && updatedArticle.status === 'published') {
    updatedArticle.publishedAt = new Date().toISOString();
  }
  
  // In a real application, save the updated article to the database
  
  return res.status(200).json({
    success: true,
    message: 'Article updated successfully',
    data: updatedArticle
  });
}

/**
 * Handle DELETE request to remove a specific article
 * 
 * @param {string} id - ID of the article to delete
 * @param {Object} res - Next.js response object
 */
function handleDeleteArticle(id, res) {
  // In a real application, remove the article from the database
  
  return res.status(200).json({
    success: true,
    message: `Article with ID ${id} deleted successfully`
  });
}
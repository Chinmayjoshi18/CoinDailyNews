/**
 * API endpoint for operations on a specific article
 * 
 * This endpoint handles operations for a single article identified by ID:
 * - GET: Retrieve a specific article
 * - PUT: Update a specific article
 * - DELETE: Delete a specific article
 */

import withErrorHandling, { ApiError, methodHandler } from '../middleware/withErrorHandling';

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
 * Find an article by ID, throw error if not found
 * 
 * @param {string} id - Article ID to find
 * @returns {Object} The found article
 * @throws {ApiError} If article not found
 */
function findArticleById(id) {
  const article = articlesData.find(article => article.id === id);
  
  if (!article) {
    throw new ApiError(`Article with ID ${id} not found`, 404);
  }
  
  return article;
}

/**
 * Handle GET request to retrieve a specific article
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetArticle(req, res) {
  const { id } = req.query;
  const article = findArticleById(id);
  
  return res.status(200).json({
    success: true,
    data: article
  });
}

/**
 * Handle PUT request to update a specific article
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleUpdateArticle(req, res) {
  const { id } = req.query;
  const article = findArticleById(id);
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
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleDeleteArticle(req, res) {
  const { id } = req.query;
  // Verify article exists before attempting to delete
  findArticleById(id);
  
  // In a real application, remove the article from the database
  
  return res.status(200).json({
    success: true,
    message: `Article with ID ${id} deleted successfully`
  });
}

// Export the handler with route handlers for each HTTP method and error handling middleware
export default withErrorHandling(
  async function articleHandler(req, res) {
    const { id } = req.query;
    
    // Handle different HTTP methods
    return methodHandler({
      GET: handleGetArticle,
      PUT: handleUpdateArticle,
      DELETE: handleDeleteArticle
    })(req, res);
  }
);
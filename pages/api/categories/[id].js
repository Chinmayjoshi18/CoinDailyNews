/**
 * API endpoint for operations on a specific category
 * 
 * This endpoint handles operations for a single category identified by ID:
 * - GET: Retrieve a specific category
 * - PUT: Update a specific category
 * - DELETE: Delete a specific category
 */

import withErrorHandling, { ApiError, methodHandler } from '../middleware/withErrorHandling';

// Sample category data to simulate a database (same as in index.js)
const categoriesData = [
  {
    id: '1',
    name: 'Market Analysis',
    slug: 'market-analysis',
    description: 'Detailed analysis of cryptocurrency markets, trends, and price movements.',
    color: '#4CAF50',
    iconName: 'trending_up',
    featuredImage: '/images/categories/market-analysis.jpg',
    displayOrder: 1
  },
  {
    id: '2',
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'News and information about blockchain technology, developments, and innovations.',
    color: '#2196F3',
    iconName: 'link',
    featuredImage: '/images/categories/blockchain.jpg',
    displayOrder: 2
  },
  {
    id: '3',
    name: 'Regulation',
    slug: 'regulation',
    description: 'Updates on cryptocurrency regulations, legal developments, and policy changes worldwide.',
    color: '#FFC107',
    iconName: 'gavel',
    featuredImage: '/images/categories/regulation.jpg',
    displayOrder: 3
  }
];

/**
 * Find a category by ID, throw error if not found
 * 
 * @param {string} id - Category ID to find
 * @returns {Object} The found category
 * @throws {ApiError} If category not found
 */
function findCategoryById(id) {
  const category = categoriesData.find(category => category.id === id);
  
  if (!category) {
    throw new ApiError(`Category with ID ${id} not found`, 404);
  }
  
  return category;
}

/**
 * Handle GET request to retrieve a specific category
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetCategory(req, res) {
  const { id } = req.query;
  const category = findCategoryById(id);
  
  return res.status(200).json({
    success: true,
    data: category
  });
}

/**
 * Handle PUT request to update a specific category
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleUpdateCategory(req, res) {
  const { id } = req.query;
  const category = findCategoryById(id);
  const updatedData = req.body;
  
  // Check if trying to update slug to one that already exists
  if (updatedData.slug && updatedData.slug !== category.slug) {
    const existingCategory = categoriesData.find(
      c => c.slug === updatedData.slug && c.id !== id
    );
    
    if (existingCategory) {
      throw new ApiError(`Category with slug '${updatedData.slug}' already exists`, 409);
    }
  }
  
  // Create updated category by merging original with updates
  const updatedCategory = {
    ...category,
    ...updatedData,
    // Preserve the original ID
    id: category.id
  };
  
  // In a real application, save the updated category to the database
  
  return res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory
  });
}

/**
 * Handle DELETE request to remove a specific category
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleDeleteCategory(req, res) {
  const { id } = req.query;
  // Verify category exists before attempting to delete
  findCategoryById(id);
  
  // In a real application:
  // 1. Check if any articles are using this category
  // 2. Either prevent deletion or update those articles
  // 3. Remove the category from the database
  
  return res.status(200).json({
    success: true,
    message: `Category with ID ${id} deleted successfully`
  });
}

// Export the handler with route handlers for each HTTP method and error handling middleware
export default withErrorHandling(
  async function categoryHandler(req, res) {
    const { id } = req.query;
    
    // Handle different HTTP methods
    return methodHandler({
      GET: handleGetCategory,
      PUT: handleUpdateCategory,
      DELETE: handleDeleteCategory
    })(req, res);
  }
);
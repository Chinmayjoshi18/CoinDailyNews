/**
 * API endpoint for category operations
 * 
 * This endpoint handles CRUD operations for article categories:
 * - GET: List all categories (with optional filtering)
 * - POST: Create a new category
 */

import withErrorHandling, { ApiError, methodHandler, validateRequest } from '../middleware/withErrorHandling';

// Sample category data to simulate a database
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
 * Handle GET request to retrieve categories
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetCategories(req, res) {
  // Extract query parameters for filtering (if any)
  const { name, slug } = req.query;
  
  let filteredCategories = [...categoriesData];
  
  // Apply filters if provided
  if (name) {
    filteredCategories = filteredCategories.filter(
      category => category.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  if (slug) {
    filteredCategories = filteredCategories.filter(
      category => category.slug === slug
    );
  }
  
  // Sort categories by displayOrder
  filteredCategories.sort((a, b) => a.displayOrder - b.displayOrder);
  
  return res.status(200).json({
    success: true,
    count: filteredCategories.length,
    data: filteredCategories
  });
}

/**
 * Handle POST request to create a new category
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleCreateCategory(req, res) {
  // Validate required fields in the request body
  const requiredFields = ['name', 'slug', 'description'];
  validateRequest(req.body, requiredFields);
  
  const { name, slug } = req.body;
  
  // Check if category with the same slug already exists
  const existingCategory = categoriesData.find(category => category.slug === slug);
  if (existingCategory) {
    throw new ApiError(`Category with slug '${slug}' already exists`, 409);
  }
  
  // Create a new category with a unique ID
  const newCategory = {
    id: Date.now().toString(),
    ...req.body,
    // Set default values for optional fields if not provided
    color: req.body.color || '#607D8B',
    iconName: req.body.iconName || 'category',
    displayOrder: req.body.displayOrder || categoriesData.length + 1
  };
  
  // In a real application, save the new category to the database
  
  return res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: newCategory
  });
}

// Export the handler with route handlers for each HTTP method and error handling middleware
export default withErrorHandling(
  async function categoriesHandler(req, res) {
    return methodHandler({
      GET: handleGetCategories,
      POST: handleCreateCategory
    })(req, res);
  }
);
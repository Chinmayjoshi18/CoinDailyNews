/**
 * API endpoint for operations on a specific category
 * 
 * This endpoint handles operations for a single category identified by ID:
 * - GET: Retrieve a specific category
 * - PUT: Update a specific category
 * - DELETE: Delete a specific category
 */

// Sample category data to simulate a database (same as in index.js)
const categoriesData = [
  {
    id: '1',
    name: 'Cryptocurrency News',
    slug: 'crypto-news',
    description: 'Latest news and updates from the cryptocurrency world',
    color: '#3498db',
    parentId: null,
    order: 1
  },
  {
    id: '2',
    name: 'Blockchain Technology',
    slug: 'blockchain',
    description: 'In-depth articles about blockchain technology and its applications',
    color: '#2ecc71',
    parentId: null,
    order: 2
  },
  {
    id: '3',
    name: 'DeFi',
    slug: 'defi',
    description: 'Decentralized Finance protocols, news, and analysis',
    color: '#9b59b6',
    parentId: null,
    order: 3
  },
  {
    id: '4',
    name: 'NFTs',
    slug: 'nft',
    description: 'Non-Fungible Tokens and the digital art revolution',
    color: '#e74c3c',
    parentId: null,
    order: 4
  },
  {
    id: '5',
    name: 'Market Analysis',
    slug: 'market-analysis',
    description: 'Technical and fundamental analysis of cryptocurrency markets',
    color: '#f39c12',
    parentId: null,
    order: 5
  },
  {
    id: '6',
    name: 'Bitcoin',
    slug: 'bitcoin',
    description: 'News and analysis focused on Bitcoin',
    color: '#f1c40f',
    parentId: '1',
    order: 1
  },
  {
    id: '7',
    name: 'Ethereum',
    slug: 'ethereum',
    description: 'News and analysis focused on Ethereum',
    color: '#1abc9c',
    parentId: '1',
    order: 2
  }
];

/**
 * Handle HTTP requests for specific category by ID
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
export default function categoryHandler(req, res) {
  const { 
    query: { id },
    method 
  } = req;

  try {
    // Find the category by ID
    const category = categoriesData.find(cat => cat.id === id);
    
    // If category doesn't exist, return 404
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: `Category with ID ${id} not found` 
      });
    }
    
    // Process based on HTTP method
    switch (method) {
      case 'GET':
        return handleGetCategory(category, req, res);
      case 'PUT':
        return handleUpdateCategory(category, req, res);
      case 'DELETE':
        return handleDeleteCategory(id, req, res);
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ 
          success: false, 
          error: `Method ${method} Not Allowed` 
        });
    }
  } catch (error) {
    console.error('Category API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing category request',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Handle GET request to retrieve a specific category
 * 
 * @param {Object} category - The category to return
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetCategory(category, req, res) {
  const { includeChildren = 'false' } = req.query;
  
  let result = { ...category };
  
  // If includeChildren is true, add children categories
  if (includeChildren === 'true') {
    const children = categoriesData.filter(cat => cat.parentId === category.id);
    result.children = children.length > 0 ? children : [];
  }
  
  return res.status(200).json({
    success: true,
    data: result
  });
}

/**
 * Handle PUT request to update a specific category
 * 
 * @param {Object} category - The original category to update
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleUpdateCategory(category, req, res) {
  const updatedData = req.body;
  
  // Check if the updated slug already exists (and it's not the current category)
  if (updatedData.slug && updatedData.slug !== category.slug) {
    const slugExists = categoriesData.some(cat => 
      cat.slug === updatedData.slug && cat.id !== category.id
    );
    
    if (slugExists) {
      return res.status(400).json({
        success: false,
        error: 'Category slug must be unique',
        field: 'slug'
      });
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
 * @param {string} id - ID of the category to delete
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleDeleteCategory(id, req, res) {
  // Check if the category has child categories
  const hasChildren = categoriesData.some(cat => cat.parentId === id);
  
  if (hasChildren) {
    return res.status(400).json({
      success: false,
      error: 'Cannot delete a category that has child categories',
      message: 'Please move or delete all child categories first'
    });
  }
  
  // In a real application, remove the category from the database
  
  return res.status(200).json({
    success: true,
    message: `Category with ID ${id} deleted successfully`
  });
}
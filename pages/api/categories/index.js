/**
 * API endpoint for category operations
 * 
 * This endpoint handles CRUD operations for categories:
 * - GET: Retrieve categories with optional filtering
 * - POST: Create a new category
 * - PUT: Not implemented at the index level (use /api/categories/[id])
 * - DELETE: Not implemented at the index level (use /api/categories/[id])
 */

// Sample category data to simulate a database
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
 * Handle HTTP requests for category management
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
export default function handler(req, res) {
  const { method } = req;
  
  try {
    switch (method) {
      case 'GET':
        return handleGetCategories(req, res);
      case 'POST':
        return handleCreateCategory(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ 
          success: false, 
          error: `Method ${method} Not Allowed` 
        });
    }
  } catch (error) {
    console.error('Categories API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing category request',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Handle GET requests to retrieve categories
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleGetCategories(req, res) {
  // Extract query parameters for filtering
  const { parentId, includeChildren = 'false' } = req.query;
  
  // Filter categories (simulating database queries)
  let filteredCategories;
  
  if (parentId === 'null') {
    // Filter for top-level categories (no parent)
    filteredCategories = categoriesData.filter(category => category.parentId === null);
  } else if (parentId) {
    // Filter for children of a specific parent
    filteredCategories = categoriesData.filter(category => category.parentId === parentId);
  } else {
    // Return all categories if no parentId filter
    filteredCategories = [...categoriesData];
  }
  
  // If includeChildren is true, add a children array to parent categories
  if (includeChildren === 'true') {
    filteredCategories = filteredCategories.map(category => {
      const children = categoriesData.filter(child => child.parentId === category.id);
      return {
        ...category,
        children: children.length > 0 ? children : []
      };
    });
  }
  
  // Sort categories by order field
  filteredCategories.sort((a, b) => a.order - b.order);
  
  return res.status(200).json({
    success: true,
    count: filteredCategories.length,
    data: filteredCategories
  });
}

/**
 * Handle POST requests to create a new category
 * 
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
function handleCreateCategory(req, res) {
  const category = req.body;
  
  // Validate required fields
  const requiredFields = ['name', 'slug'];
  const missingFields = requiredFields.filter(field => !category[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      missingFields
    });
  }
  
  // Check if slug already exists
  const slugExists = categoriesData.some(cat => cat.slug === category.slug);
  if (slugExists) {
    return res.status(400).json({
      success: false,
      error: 'Category slug must be unique',
      field: 'slug'
    });
  }
  
  // Create a new category with generated ID
  const newCategory = {
    id: (categoriesData.length + 1).toString(),
    parentId: category.parentId || null,
    color: category.color || '#3498db',
    order: category.order || categoriesData.length + 1,
    ...category
  };
  
  // In a real app, this would insert the category into a database
  
  return res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: newCategory
  });
}
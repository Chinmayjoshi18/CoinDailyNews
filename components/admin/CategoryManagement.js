import { useState } from 'react';

/**
 * CategoryManagement component for the admin panel
 * Allows administrators to create, edit, and delete categories
 * 
 * @returns {JSX.Element} The category management component
 */
export default function CategoryManagement() {
  // Mock categories data
  const [categories, setCategories] = useState([
    {
      id: 'cryptocurrency',
      name: 'Cryptocurrency',
      slug: 'cryptocurrency',
      description: 'News and analysis about various cryptocurrencies',
      articleCount: 145,
      subCategories: [
        { id: 'bitcoin', name: 'Bitcoin', slug: 'bitcoin', articleCount: 58 },
        { id: 'ethereum', name: 'Ethereum', slug: 'ethereum', articleCount: 42 },
        { id: 'altcoins', name: 'Altcoins', slug: 'altcoins', articleCount: 35 },
        { id: 'mining', name: 'Mining', slug: 'mining', articleCount: 10 },
        { id: 'adoption', name: 'Adoption', slug: 'adoption', articleCount: 18 },
        { id: 'cbdc', name: 'CBDC', slug: 'cbdc', articleCount: 14 },
        { id: 'regulation', name: 'Regulation', slug: 'regulation', articleCount: 23 }
      ]
    },
    {
      id: 'blockchain',
      name: 'Blockchain',
      slug: 'blockchain',
      description: 'Articles about blockchain technology and development',
      articleCount: 98,
      subCategories: [
        { id: 'technology', name: 'Technology', slug: 'technology', articleCount: 32 },
        { id: 'development', name: 'Development', slug: 'development', articleCount: 27 },
        { id: 'security', name: 'Security', slug: 'security', articleCount: 15 },
        { id: 'enterprise', name: 'Enterprise', slug: 'enterprise', articleCount: 19 },
        { id: 'solutions', name: 'Solutions', slug: 'solutions', articleCount: 12 },
        { id: 'research', name: 'Research', slug: 'research', articleCount: 8 }
      ]
    },
    {
      id: 'web3',
      name: 'Web3',
      slug: 'web3',
      description: 'Coverage of the decentralized web and related technologies',
      articleCount: 76,
      subCategories: [
        { id: 'metaverse', name: 'Metaverse', slug: 'metaverse', articleCount: 22 },
        { id: 'daos', name: 'DAOs', slug: 'daos', articleCount: 17 },
        { id: 'gaming', name: 'Gaming', slug: 'gaming', articleCount: 25 },
        { id: 'infrastructure', name: 'Infrastructure', slug: 'infrastructure', articleCount: 9 },
        { id: 'identity', name: 'Identity', slug: 'identity', articleCount: 7 }
      ]
    },
    {
      id: 'nfts',
      name: 'NFTs',
      slug: 'nfts',
      description: 'News and trends in non-fungible tokens',
      articleCount: 62,
      subCategories: [
        { id: 'art', name: 'Art', slug: 'art', articleCount: 28 },
        { id: 'gaming', name: 'Gaming', slug: 'gaming', articleCount: 15 },
        { id: 'music', name: 'Music', slug: 'music', articleCount: 12 },
        { id: 'collectibles', name: 'Collectibles', slug: 'collectibles', articleCount: 19 },
        { id: 'markets', name: 'Markets', slug: 'markets', articleCount: 10 }
      ]
    },
    {
      id: 'defi',
      name: 'DeFi',
      slug: 'defi',
      description: 'Decentralized finance news, analysis, and trends',
      articleCount: 82,
      subCategories: [
        { id: 'lending', name: 'Lending', slug: 'lending', articleCount: 24 },
        { id: 'dexs', name: 'DEXs', slug: 'dexs', articleCount: 19 },
        { id: 'yield', name: 'Yield', slug: 'yield', articleCount: 15 },
        { id: 'insurance', name: 'Insurance', slug: 'insurance', articleCount: 8 },
        { id: 'stablecoins', name: 'Stablecoins', slug: 'stablecoins', articleCount: 21 }
      ]
    }
  ]);

  // Form state for new/edit category
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    description: ''
  });

  // Form state for new/edit subcategory
  const [subCategoryFormData, setSubCategoryFormData] = useState({
    id: '',
    name: '',
    slug: '',
    parentId: ''
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle input changes for category form
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name' && !formData.slug) {
      // Auto-generate slug when typing name if slug is empty
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
        id: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle input changes for subcategory form
  const handleSubCategoryChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name' && !subCategoryFormData.slug) {
      // Auto-generate slug when typing name if slug is empty
      setSubCategoryFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
        id: generateSlug(value)
      }));
    } else {
      setSubCategoryFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Edit category
  const handleEditCategory = (category) => {
    setFormData({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description
    });
    setEditingCategory(category.id);
    setShowCategoryForm(true);
  };

  // Edit subcategory
  const handleEditSubCategory = (subCategory, parentId) => {
    setSubCategoryFormData({
      id: subCategory.id,
      name: subCategory.name,
      slug: subCategory.slug,
      parentId
    });
    setEditingSubCategory(subCategory.id);
    setShowSubCategoryForm(true);
  };

  // Add new category button
  const handleAddCategory = () => {
    setFormData({
      id: '',
      name: '',
      slug: '',
      description: ''
    });
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  // Add new subcategory button
  const handleAddSubCategory = (parentId) => {
    setSubCategoryFormData({
      id: '',
      name: '',
      slug: '',
      parentId
    });
    setEditingSubCategory(null);
    setShowSubCategoryForm(true);
    
    // Make sure parent category is expanded
    if (!expandedCategories.includes(parentId)) {
      setExpandedCategories([...expandedCategories, parentId]);
    }
  };

  // Submit category form
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    
    if (formData.name.trim() === '' || formData.slug.trim() === '') {
      return; // Basic validation
    }
    
    if (editingCategory) {
      // Update existing category
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.id === editingCategory
            ? { 
                ...category, 
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                id: formData.id
              }
            : category
        )
      );
    } else {
      // Add new category
      setCategories(prevCategories => [
        ...prevCategories,
        {
          id: formData.id || generateSlug(formData.name),
          name: formData.name,
          slug: formData.slug || generateSlug(formData.name),
          description: formData.description,
          articleCount: 0,
          subCategories: []
        }
      ]);
    }
    
    // Reset form
    setFormData({
      id: '',
      name: '',
      slug: '',
      description: ''
    });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  // Submit subcategory form
  const handleSubCategorySubmit = (e) => {
    e.preventDefault();
    
    if (subCategoryFormData.name.trim() === '' || subCategoryFormData.slug.trim() === '' || !subCategoryFormData.parentId) {
      return; // Basic validation
    }
    
    setCategories(prevCategories => 
      prevCategories.map(category => {
        if (category.id === subCategoryFormData.parentId) {
          if (editingSubCategory) {
            // Update existing subcategory
            const updatedSubCategories = category.subCategories.map(subCat => 
              subCat.id === editingSubCategory
                ? { 
                    id: subCategoryFormData.id,
                    name: subCategoryFormData.name,
                    slug: subCategoryFormData.slug,
                    articleCount: subCat.articleCount
                  }
                : subCat
            );
            return { ...category, subCategories: updatedSubCategories };
          } else {
            // Add new subcategory
            return {
              ...category,
              subCategories: [
                ...category.subCategories,
                {
                  id: subCategoryFormData.id || generateSlug(subCategoryFormData.name),
                  name: subCategoryFormData.name,
                  slug: subCategoryFormData.slug || generateSlug(subCategoryFormData.name),
                  articleCount: 0
                }
              ]
            };
          }
        }
        return category;
      })
    );
    
    // Reset form
    setSubCategoryFormData({
      id: '',
      name: '',
      slug: '',
      parentId: ''
    });
    setEditingSubCategory(null);
    setShowSubCategoryForm(false);
  };

  // Delete category
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This will not delete associated articles, but they will need to be reassigned to a different category.')) {
      setCategories(categories.filter(category => category.id !== categoryId));
    }
  };

  // Delete subcategory
  const handleDeleteSubCategory = (categoryId, subCategoryId) => {
    if (window.confirm('Are you sure you want to delete this subcategory? This will not delete associated articles, but they will need to be reassigned to a different subcategory.')) {
      setCategories(prevCategories => 
        prevCategories.map(category => {
          if (category.id === categoryId) {
            return {
              ...category,
              subCategories: category.subCategories.filter(subCat => subCat.id !== subCategoryId)
            };
          }
          return category;
        })
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Category Management</h1>
        <button 
          className="btn btn-primary"
          onClick={handleAddCategory}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Categories list */}
      <div className="mb-6">
        {categories.length === 0 ? (
          <div className="card p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No categories found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Get started by creating your first category.
            </p>
            <button 
              className="btn btn-primary mt-4"
              onClick={handleAddCategory}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Category
            </button>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories.map(category => (
                <li key={category.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          className="mr-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          onClick={() => toggleCategoryExpansion(category.id)}
                          aria-label={expandedCategories.includes(category.id) ? 'Collapse category' : 'Expand category'}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform ${expandedCategories.includes(category.id) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <span className="text-lg font-medium text-gray-900 dark:text-white">{category.name}</span>
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {category.articleCount} articles
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          onClick={() => handleAddSubCategory(category.id)}
                          title="Add subcategory"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={() => handleEditCategory(category)}
                          title="Edit category"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => handleDeleteCategory(category.id)}
                          title="Delete category"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {category.description}
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Slug: </span>
                      <code className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">/{category.slug}</code>
                    </div>
                    
                    {/* Subcategories */}
                    {expandedCategories.includes(category.id) && (
                      <div className="mt-4 ml-7 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                        {category.subCategories.length === 0 ? (
                          <div className="py-2 text-sm text-gray-500 dark:text-gray-400">
                            No subcategories. 
                            <button 
                              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline" 
                              onClick={() => handleAddSubCategory(category.id)}
                            >
                              Add one?
                            </button>
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {category.subCategories.map(subCategory => (
                              <li key={subCategory.id} className="flex items-center justify-between pl-2 pr-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600">
                                <div>
                                  <div className="flex items-center">
                                    <span className="text-gray-800 dark:text-gray-200">{subCategory.name}</span>
                                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                      {subCategory.articleCount} articles
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Slug: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">/{category.slug}/{subCategory.slug}</code>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                    onClick={() => handleEditSubCategory(subCategory, category.id)}
                                    title="Edit subcategory"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    onClick={() => handleDeleteSubCategory(category.id, subCategory.id)}
                                    title="Delete subcategory"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowCategoryForm(false)}></div>
            
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => setShowCategoryForm(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input w-full"
                    placeholder="Category name"
                    value={formData.name}
                    onChange={handleCategoryChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Slug *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 text-sm">
                      /
                    </span>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      className="input rounded-none rounded-r-md w-full"
                      placeholder="category-slug"
                      value={formData.slug}
                      onChange={handleCategoryChange}
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Used for URLs. Only lowercase letters, numbers, and hyphens.
                  </p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className="input w-full"
                    placeholder="Brief description of this category"
                    value={formData.description}
                    onChange={handleCategoryChange}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowCategoryForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Subcategory Form Modal */}
      {showSubCategoryForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowSubCategoryForm(false)}></div>
            
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {editingSubCategory ? 'Edit Subcategory' : 'Add New Subcategory'}
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => setShowSubCategoryForm(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubCategorySubmit}>
                <div className="mb-4">
                  <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Parent Category
                  </label>
                  <select
                    id="parentId"
                    name="parentId"
                    className="input w-full"
                    value={subCategoryFormData.parentId}
                    onChange={handleSubCategoryChange}
                    disabled={editingSubCategory}
                    required
                  >
                    <option value="">Select parent category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="sub-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="sub-name"
                    name="name"
                    className="input w-full"
                    placeholder="Subcategory name"
                    value={subCategoryFormData.name}
                    onChange={handleSubCategoryChange}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="sub-slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    id="sub-slug"
                    name="slug"
                    className="input w-full"
                    placeholder="subcategory-slug"
                    value={subCategoryFormData.slug}
                    onChange={handleSubCategoryChange}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Used for URLs. Only lowercase letters, numbers, and hyphens.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowSubCategoryForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {editingSubCategory ? 'Update Subcategory' : 'Add Subcategory'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
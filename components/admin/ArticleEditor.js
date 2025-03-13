import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamically import the rich text editor with no SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

/**
 * ArticleEditor component for creating and editing articles
 * 
 * @param {Object} props - Component props
 * @param {Object} props.article - Article data for editing (null for new articles)
 * @returns {JSX.Element} The article editor component
 */
export default function ArticleEditor({ article = null }) {
  const router = useRouter();
  const isEditMode = !!article;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    subCategory: '',
    featured: false,
    coverImage: '',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Editor modules configuration
  const editorModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }]
    ],
  };

  // Categories options
  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'Cryptocurrency', label: 'Cryptocurrency' },
    { value: 'Blockchain', label: 'Blockchain' },
    { value: 'Web3', label: 'Web3' },
    { value: 'NFTs', label: 'NFTs' },
    { value: 'DeFi', label: 'DeFi' },
    { value: 'Markets', label: 'Markets' },
    { value: 'Regulation', label: 'Regulation' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Business', label: 'Business' },
    { value: 'AI', label: 'AI' }
  ];

  // Sub-categories options based on main category
  const subCategoryOptions = {
    Cryptocurrency: [
      { value: 'Bitcoin', label: 'Bitcoin' },
      { value: 'Ethereum', label: 'Ethereum' },
      { value: 'Altcoins', label: 'Altcoins' },
      { value: 'Mining', label: 'Mining' },
      { value: 'Adoption', label: 'Adoption' },
      { value: 'CBDC', label: 'CBDC' },
      { value: 'Regulation', label: 'Regulation' }
    ],
    Blockchain: [
      { value: 'Technology', label: 'Technology' },
      { value: 'Development', label: 'Development' },
      { value: 'Security', label: 'Security' },
      { value: 'Enterprise', label: 'Enterprise' },
      { value: 'Solutions', label: 'Solutions' },
      { value: 'Research', label: 'Research' }
    ],
    Web3: [
      { value: 'Metaverse', label: 'Metaverse' },
      { value: 'DAOs', label: 'DAOs' },
      { value: 'Gaming', label: 'Gaming' },
      { value: 'Infrastructure', label: 'Infrastructure' },
      { value: 'Identity', label: 'Identity' }
    ],
    NFTs: [
      { value: 'Art', label: 'Art' },
      { value: 'Gaming', label: 'Gaming' },
      { value: 'Music', label: 'Music' },
      { value: 'Collectibles', label: 'Collectibles' },
      { value: 'Markets', label: 'Markets' }
    ],
    DeFi: [
      { value: 'Lending', label: 'Lending' },
      { value: 'DEXs', label: 'DEXs' },
      { value: 'Yield', label: 'Yield' },
      { value: 'Insurance', label: 'Insurance' },
      { value: 'Stablecoins', label: 'Stablecoins' }
    ],
    Markets: [
      { value: 'Analysis', label: 'Analysis' },
      { value: 'Trading', label: 'Trading' },
      { value: 'Exchanges', label: 'Exchanges' },
      { value: 'Derivatives', label: 'Derivatives' },
      { value: 'Investments', label: 'Investments' }
    ],
    Regulation: [
      { value: 'Global', label: 'Global' },
      { value: 'US', label: 'US' },
      { value: 'EU', label: 'EU' },
      { value: 'Asia', label: 'Asia' },
      { value: 'Policy', label: 'Policy' }
    ],
    Technology: [
      { value: 'Innovation', label: 'Innovation' },
      { value: 'Privacy', label: 'Privacy' },
      { value: 'Scaling', label: 'Scaling' },
      { value: 'Interoperability', label: 'Interoperability' },
      { value: 'Security', label: 'Security' }
    ],
    Business: [
      { value: 'Adoption', label: 'Adoption' },
      { value: 'Startups', label: 'Startups' },
      { value: 'Enterprise', label: 'Enterprise' },
      { value: 'Investments', label: 'Investments' },
      { value: 'Partnerships', label: 'Partnerships' }
    ],
    AI: [
      { value: 'Trading', label: 'Trading' },
      { value: 'Analysis', label: 'Analysis' },
      { value: 'Integration', label: 'Integration' },
      { value: 'Research', label: 'Research' },
      { value: 'Application', label: 'Application' }
    ]
  };

  // Set form data when article is provided
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        slug: article.id || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        category: article.category || '',
        subCategory: article.subCategory || '',
        featured: article.featured || false,
        coverImage: article.coverImage || '',
        tags: article.tags ? article.tags.join(', ') : '',
        metaTitle: article.metaTitle || '',
        metaDescription: article.metaDescription || '',
        status: article.status || 'draft'
      });
    }
  }, [article]);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'title' && !formData.slug) {
      // Auto-generate slug when typing title if slug is empty
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle rich text editor change
  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
    
    // Clear error if it exists
    if (errors.content) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.content;
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      // In a real application, this would call an API endpoint
      // For this demo, we're just simulating success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const savedArticle = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        id: formData.slug,
        updatedAt: new Date().toISOString()
      };
      
      if (formData.status === 'published') {
        savedArticle.publishedAt = new Date().toISOString();
      }
      
      // Show success message
      setSuccessMessage(
        isEditMode
          ? `Article "${formData.title}" has been updated successfully.`
          : `Article "${formData.title}" has been created successfully.`
      );
      
      // In a real application, redirect to article list after successful save
      // setTimeout(() => router.push('/admin/articles'), 2000);
      
    } catch (error) {
      console.error('Error saving article:', error);
      setErrors({ submit: 'Failed to save article. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle publish/unpublish
  const handlePublishToggle = () => {
    setFormData(prev => ({
      ...prev,
      status: prev.status === 'published' ? 'draft' : 'published'
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isEditMode ? 'Edit Article' : 'Create New Article'}
        </h1>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePublishToggle}
            className={`btn ${
              formData.status === 'published' 
                ? 'btn-warning' 
                : 'btn-success'
            }`}
            disabled={isSubmitting}
          >
            {formData.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded dark:bg-green-900 dark:border-green-800 dark:text-green-200">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-800 dark:text-red-200">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errors.submit}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`input w-full ${errors.title ? 'border-red-500 dark:border-red-700' : ''}`}
                  placeholder="Enter article title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                )}
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
                    className={`input rounded-none rounded-r-md w-full ${errors.slug ? 'border-red-500 dark:border-red-700' : ''}`}
                    placeholder="article-slug"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                </div>
                {errors.slug ? (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.slug}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    This will be used for the article URL. Use only lowercase letters, numbers, and hyphens.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="2"
                  className={`input w-full ${errors.excerpt ? 'border-red-500 dark:border-red-700' : ''}`}
                  placeholder="Brief summary of the article"
                  value={formData.excerpt}
                  onChange={handleChange}
                />
                {errors.excerpt ? (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.excerpt}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    This will be displayed on article cards and in search results.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content *
                </label>
                <div className={`${errors.content ? 'border border-red-500 dark:border-red-700 rounded-md' : ''}`}>
                  {typeof window !== 'undefined' && (
                    <ReactQuill
                      theme="snow"
                      modules={editorModules}
                      value={formData.content}
                      onChange={handleEditorChange}
                      placeholder="Write your article content here..."
                      className="bg-white dark:bg-slate-800 min-h-[300px]"
                    />
                  )}
                </div>
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>
                )}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO Settings</h3>
              
              <div className="mb-4">
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  className="input w-full"
                  placeholder="SEO title (defaults to article title if empty)"
                  value={formData.metaTitle}
                  onChange={handleChange}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Recommended length: 50-60 characters
                </p>
              </div>

              <div>
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows="3"
                  className="input w-full"
                  placeholder="SEO description (defaults to excerpt if empty)"
                  value={formData.metaDescription}
                  onChange={handleChange}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Recommended length: 150-160 characters
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Publishing Settings</h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    formData.status === 'published' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formData.status === 'published' 
                    ? 'This article is visible to all users.' 
                    : 'This article is only visible to administrators.'}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Featured Article
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 pl-6">
                  Featured articles are displayed prominently on the homepage.
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Category & Tags</h3>
              
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  className={`input w-full ${errors.category ? 'border-red-500 dark:border-red-700' : ''}`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sub-Category
                </label>
                <select
                  id="subCategory"
                  name="subCategory"
                  className="input w-full"
                  value={formData.subCategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                >
                  <option value="">Select a sub-category</option>
                  {formData.category && subCategoryOptions[formData.category]?.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="input w-full"
                  placeholder="Enter tags, separated by commas"
                  value={formData.tags}
                  onChange={handleChange}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Tags help users find related content. Separate with commas.
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Featured Image</h3>
              
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  id="coverImage"
                  name="coverImage"
                  className="input w-full mb-2"
                  placeholder="https://example.com/image.jpg"
                  value={formData.coverImage}
                  onChange={handleChange}
                />
                
                {formData.coverImage ? (
                  <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <img 
                      src={formData.coverImage} 
                      alt="Cover preview" 
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/640x360?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                ) : (
                  <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-40">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No image selected</p>
                    </div>
                  </div>
                )}
                
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Recommended size: 1200×630 pixels
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
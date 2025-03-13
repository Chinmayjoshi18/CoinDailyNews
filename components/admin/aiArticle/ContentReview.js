import { useState, useEffect } from 'react';

/**
 * ContentReview component - Displays and allows editing of AI-generated content
 * 
 * @param {Object} props - Component props
 * @param {Object} props.generatedContent - The AI-generated content
 * @param {Function} props.onSave - Function to call when saving content
 * @param {Function} props.onPublish - Function to call when publishing content
 * @param {Function} props.onRegenerate - Function to call when regenerating content
 * @param {boolean} props.isLoading - Whether content is currently being generated
 * @returns {JSX.Element} The content review component
 */
export default function ContentReview({ 
  generatedContent, 
  onSave, 
  onPublish, 
  onRegenerate,
  isLoading = false
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentScore, setContentScore] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [sourceInfo, setSourceInfo] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('crypto-news');
  const [metadata, setMetadata] = useState({
    author: 'AI Assistant',
    tags: [],
    featuredImage: '',
    seoDescription: '',
  });
  const [tagInput, setTagInput] = useState('');

  // Update state when generatedContent changes
  useEffect(() => {
    if (generatedContent) {
      setTitle(generatedContent.title || '');
      setContent(generatedContent.content || '');
      setContentScore(generatedContent.contentScore || null);
      setSourceInfo(generatedContent.sources || []);
      
      if (generatedContent.metadata) {
        setMetadata({
          author: generatedContent.metadata.author || 'AI Assistant',
          tags: generatedContent.metadata.tags || [],
          featuredImage: generatedContent.metadata.featuredImage || '',
          seoDescription: generatedContent.metadata.seoDescription || '',
        });
      }
    }
  }, [generatedContent]);

  // Calculate word count when content changes
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      setWordCount(words);
    } else {
      setWordCount(0);
    }
  }, [content]);

  /**
   * Handle adding a new tag
   * @param {Event} e - Form submit event
   */
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !metadata.tags.includes(tagInput.trim())) {
      setMetadata({
        ...metadata,
        tags: [...metadata.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  /**
   * Handle removing a tag
   * @param {string} tagToRemove - Tag to remove
   */
  const handleRemoveTag = (tagToRemove) => {
    setMetadata({
      ...metadata,
      tags: metadata.tags.filter(tag => tag !== tagToRemove)
    });
  };

  /**
   * Handle saving the content
   */
  const handleSave = () => {
    onSave({
      title,
      content,
      category: selectedCategory,
      metadata
    });
  };

  /**
   * Handle publishing the content
   */
  const handlePublish = () => {
    onPublish({
      title,
      content,
      category: selectedCategory,
      metadata
    });
  };

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">Generating content...</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">This may take a minute or two depending on the source complexity.</p>
        </div>
      </div>
    );
  }

  if (!generatedContent || (!title && !content)) {
    return (
      <div className="card p-6">
        <div className="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Content Generated Yet</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Use one of the input methods above to generate content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Content Review</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="article-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Article Title
            </label>
            <input
              id="article-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input w-full"
              placeholder="Enter article title"
            />
          </div>
          
          {/* Content */}
          <div>
            <label htmlFor="article-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Article Content
            </label>
            <textarea
              id="article-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input w-full min-h-[400px]"
              placeholder="Enter article content"
            />
            <div className="mt-1 text-xs text-gray-500 flex justify-between">
              <span>Word count: {wordCount}</span>
              {contentScore && (
                <span className="text-green-600">
                  Content quality score: {contentScore}/100
                </span>
              )}
            </div>
          </div>
          
          {/* Sources */}
          {sourceInfo && sourceInfo.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sources:</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  {sourceInfo.map((source, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-1">•</span>
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {source.title || source.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar/metadata column */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <label htmlFor="article-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="article-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-full"
            >
              <option value="crypto-news">Cryptocurrency News</option>
              <option value="blockchain">Blockchain Technology</option>
              <option value="defi">DeFi</option>
              <option value="nft">NFTs</option>
              <option value="regulation">Regulation</option>
              <option value="market-analysis">Market Analysis</option>
            </select>
          </div>
          
          {/* Author */}
          <div>
            <label htmlFor="article-author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Author
            </label>
            <input
              id="article-author"
              type="text"
              value={metadata.author}
              onChange={(e) => setMetadata({...metadata, author: e.target.value})}
              className="input w-full"
            />
          </div>
          
          {/* Featured Image */}
          <div>
            <label htmlFor="featured-image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Featured Image URL
            </label>
            <input
              id="featured-image"
              type="text"
              value={metadata.featuredImage}
              onChange={(e) => setMetadata({...metadata, featuredImage: e.target.value})}
              className="input w-full"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          {/* SEO Description */}
          <div>
            <label htmlFor="seo-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              SEO Description
            </label>
            <textarea
              id="seo-description"
              value={metadata.seoDescription}
              onChange={(e) => setMetadata({...metadata, seoDescription: e.target.value})}
              className="input w-full h-20"
              placeholder="Enter SEO description"
              maxLength={160}
            />
            <div className="mt-1 text-xs text-gray-500">
              {metadata.seoDescription.length}/160 characters
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <label htmlFor="article-tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags
            </label>
            <form onSubmit={handleAddTag} className="flex">
              <input
                id="article-tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="input flex-grow rounded-r-none"
                placeholder="Add a tag"
              />
              <button 
                type="submit"
                className="btn btn-primary rounded-l-none px-3"
              >
                Add
              </button>
            </form>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {metadata.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-secondary w-full"
            >
              Save as Draft
            </button>
            
            <button
              type="button"
              onClick={handlePublish}
              className="btn btn-primary w-full"
            >
              Publish Article
            </button>
            
            <button
              type="button"
              onClick={onRegenerate}
              className="btn btn-outline w-full"
            >
              Regenerate Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
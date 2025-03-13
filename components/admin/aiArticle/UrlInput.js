import { useState } from 'react';

/**
 * UrlInput component - Input form for generating content from a single news URL
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onGenerate - Function to call when generating content
 * @returns {JSX.Element} The URL input component
 */
export default function UrlInput({ onGenerate }) {
  const [newsUrl, setNewsUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [articleType, setArticleType] = useState('rewrite');
  const [contentLength, setContentLength] = useState('medium');
  const [error, setError] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newsUrl) {
      setError('Please enter a news URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(newsUrl);
      setError('');
    } catch (err) {
      setError('Please enter a valid URL');
      return;
    }
    
    // Call the onGenerate function with form data
    onGenerate({
      newsUrl,
      customTitle,
      articleType,
      contentLength
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Generate from URL</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* News URL Input */}
          <div>
            <label htmlFor="news-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              News Article URL*
            </label>
            <input
              id="news-url"
              type="text"
              value={newsUrl}
              onChange={(e) => setNewsUrl(e.target.value)}
              className="input w-full"
              placeholder="https://example.com/news/article"
              required
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter a direct URL to a cryptocurrency news article or blog post
            </p>
          </div>
          
          {/* Custom Title */}
          <div>
            <label htmlFor="custom-title-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Title (Optional)
            </label>
            <input
              id="custom-title-url"
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="input w-full"
              placeholder="Leave blank to auto-generate"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Article Type */}
            <div>
              <label htmlFor="article-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Article Type
              </label>
              <select
                id="article-type"
                value={articleType}
                onChange={(e) => setArticleType(e.target.value)}
                className="input w-full"
              >
                <option value="rewrite">Rewrite with unique angle</option>
                <option value="summary">Summarized version</option>
                <option value="expand">Expanded with context</option>
                <option value="opinion">Opinion/Analysis</option>
              </select>
            </div>
            
            {/* Content Length */}
            <div>
              <label htmlFor="content-length" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content Length
              </label>
              <select
                id="content-length"
                value={contentLength}
                onChange={(e) => setContentLength(e.target.value)}
                className="input w-full"
              >
                <option value="short">Short (~300 words)</option>
                <option value="medium">Medium (~600 words)</option>
                <option value="long">Long (~1000 words)</option>
                <option value="comprehensive">Comprehensive (~1500 words)</option>
              </select>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Generate Content
            </button>
          </div>
        </div>
      </form>
      
      {/* Examples */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example URLs:</h3>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs">
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li>• https://cointelegraph.com/news/bitcoin-price-analysis</li>
            <li>• https://decrypt.co/news/ethereum-developers-announce-update</li>
            <li>• https://www.coindesk.com/business/2023/03/12/bitcoin-shows-resilience-amid-banking-crisis/</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
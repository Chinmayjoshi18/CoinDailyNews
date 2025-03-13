import { useState } from 'react';

/**
 * RssInput component - Input form for generating content from RSS feeds
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onGenerate - Function to call when generating content
 * @returns {JSX.Element} The RSS input component
 */
export default function RssInput({ onGenerate }) {
  const [rssUrls, setRssUrls] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [articleType, setArticleType] = useState('roundup');
  const [contentLength, setContentLength] = useState('medium');
  const [includeSources, setIncludeSources] = useState(true);
  const [error, setError] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!rssUrls.trim()) {
      setError('Please enter at least one RSS feed URL');
      return;
    }
    
    // Check that each line is a valid URL
    const urls = rssUrls.split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    if (urls.length === 0) {
      setError('Please enter at least one valid RSS feed URL');
      return;
    }
    
    let isValid = true;
    urls.forEach(url => {
      try {
        new URL(url);
      } catch (err) {
        isValid = false;
        setError(`Invalid URL: ${url}`);
      }
    });
    
    if (!isValid) return;
    
    setError('');
    
    // Call the onGenerate function with form data
    onGenerate({
      rssUrls,
      customTitle,
      articleType,
      contentLength,
      includeSources
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Generate from RSS Feeds</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* RSS URLs Input */}
          <div>
            <label htmlFor="rss-urls" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              RSS Feed URLs*
            </label>
            <textarea
              id="rss-urls"
              value={rssUrls}
              onChange={(e) => setRssUrls(e.target.value)}
              className="input w-full"
              rows="4"
              placeholder="https://example.com/feed.xml&#10;https://another-site.com/rss&#10;https://news-site.com/crypto/feed"
              required
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter one RSS feed URL per line. The AI will analyze and combine content from these feeds.
            </p>
          </div>
          
          {/* Custom Title */}
          <div>
            <label htmlFor="custom-title-rss" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Title (Optional)
            </label>
            <input
              id="custom-title-rss"
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
                <option value="roundup">News Roundup</option>
                <option value="analysis">Analytical Piece</option>
                <option value="comparison">Comparison Article</option>
                <option value="trends">Trend Report</option>
              </select>
            </div>
            
            {/* Content Length */}
            <div>
              <label htmlFor="content-length-rss" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content Length
              </label>
              <select
                id="content-length-rss"
                value={contentLength}
                onChange={(e) => setContentLength(e.target.value)}
                className="input w-full"
              >
                <option value="short">Short (~400 words)</option>
                <option value="medium">Medium (~800 words)</option>
                <option value="long">Long (~1200 words)</option>
              </select>
            </div>
          </div>
          
          {/* Include Sources Option */}
          <div className="flex items-center">
            <input
              id="include-sources"
              type="checkbox"
              checked={includeSources}
              onChange={(e) => setIncludeSources(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="include-sources" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Include list of sources at the end of the article
            </label>
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
      
      {/* Example Feeds */}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example Cryptocurrency RSS Feeds</h3>
        <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <li>https://cointelegraph.com/rss</li>
          <li>https://coindesk.com/arc/outboundfeeds/rss/</li>
          <li>https://news.bitcoin.com/feed/</li>
          <li>https://decrypto.co/feed</li>
          <li>https://bitcoinmagazine.com/feed</li>
        </ul>
      </div>
    </div>
  );
}
import { useState } from 'react';

/**
 * WebsiteInput component - Input form for generating content from a website
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onGenerate - Function to call when generating content
 * @returns {JSX.Element} The website input component
 */
export default function WebsiteInput({ onGenerate }) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [crawlDepth, setCrawlDepth] = useState('1');
  const [topicFocus, setTopicFocus] = useState('');
  const [contentStyle, setContentStyle] = useState('informative');
  const [error, setError] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!websiteUrl) {
      setError('Please enter a website URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(websiteUrl);
      setError('');
    } catch (err) {
      setError('Please enter a valid website URL');
      return;
    }
    
    // Call the onGenerate function with form data
    onGenerate({
      websiteUrl,
      customTitle,
      crawlDepth: parseInt(crawlDepth, 10),
      topicFocus,
      contentStyle
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Generate from Website</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Website URL Input */}
          <div>
            <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Website URL*
            </label>
            <input
              id="website-url"
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="input w-full"
              placeholder="https://example.com"
              required
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter the URL of a news website or blog. The AI will crawl and analyze content from this site.
            </p>
          </div>
          
          {/* Custom Title */}
          <div>
            <label htmlFor="custom-title-website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Title (Optional)
            </label>
            <input
              id="custom-title-website"
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="input w-full"
              placeholder="Leave blank to auto-generate"
            />
          </div>
          
          {/* Topic Focus */}
          <div>
            <label htmlFor="topic-focus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic Focus (Optional)
            </label>
            <input
              id="topic-focus"
              type="text"
              value={topicFocus}
              onChange={(e) => setTopicFocus(e.target.value)}
              className="input w-full"
              placeholder="e.g., DeFi, NFTs, Bitcoin, Regulation"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Specify a topic to focus on when crawling the website. Leave empty to analyze all content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Crawl Depth */}
            <div>
              <label htmlFor="crawl-depth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Crawl Depth
              </label>
              <select
                id="crawl-depth"
                value={crawlDepth}
                onChange={(e) => setCrawlDepth(e.target.value)}
                className="input w-full"
              >
                <option value="1">Minimal (homepage only)</option>
                <option value="2">Standard (homepage + direct links)</option>
                <option value="3">Deep (extended crawl)</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Deeper crawls take longer but provide more comprehensive content
              </p>
            </div>
            
            {/* Content Style */}
            <div>
              <label htmlFor="content-style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content Style
              </label>
              <select
                id="content-style"
                value={contentStyle}
                onChange={(e) => setContentStyle(e.target.value)}
                className="input w-full"
              >
                <option value="informative">Informative</option>
                <option value="analytical">Analytical</option>
                <option value="summary">Summary</option>
                <option value="trending">Trending Topics</option>
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
      
      {/* Note */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-md">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p>
              Website crawling may take longer than other methods, especially for deeper crawl depths. 
              The AI will analyze multiple pages to generate a comprehensive article based on the website's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
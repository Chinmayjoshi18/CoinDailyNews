import { useState } from 'react';

/**
 * UrlInput component - Input form for generating content from a single URL
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onGenerate - Function to call when generating content
 * @returns {JSX.Element} The URL input component
 */
export default function UrlInput({ onGenerate }) {
  const [url, setUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [includeImages, setIncludeImages] = useState(true);
  const [preserveLinks, setPreserveLinks] = useState(true);
  const [contentLength, setContentLength] = useState('medium');
  const [error, setError] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url);
      setError('');
    } catch (err) {
      setError('Please enter a valid URL');
      return;
    }
    
    // Call the onGenerate function with form data
    onGenerate({
      url,
      customTitle,
      includeImages,
      preserveLinks,
      contentLength
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Generate from URL</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* URL Input */}
          <div>
            <label htmlFor="news-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              News Article URL*
            </label>
            <input
              id="news-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input w-full"
              placeholder="https://example.com/article"
              required
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter the URL of a news article, blog post, or press release to generate content from
            </p>
          </div>
          
          {/* Custom Title */}
          <div>
            <label htmlFor="custom-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Title (Optional)
            </label>
            <input
              id="custom-title"
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="input w-full"
              placeholder="Leave blank to auto-generate"
            />
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
            </select>
          </div>
          
          {/* Options */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Options</h3>
            
            <div className="flex items-center">
              <input
                id="include-images"
                type="checkbox"
                checked={includeImages}
                onChange={(e) => setIncludeImages(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="include-images" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Include images from source
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="preserve-links"
                type="checkbox"
                checked={preserveLinks}
                onChange={(e) => setPreserveLinks(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="preserve-links" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Preserve important links
              </label>
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
    </div>
  );
}
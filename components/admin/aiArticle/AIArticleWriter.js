import { useState } from 'react';
import UrlInput from './UrlInput';
import RssInput from './RssInput';
import WebsiteInput from './WebsiteInput';
import ArticleReview from './ArticleReview';

/**
 * AIArticleWriter component - Main interface for generating AI-assisted content
 * 
 * @returns {JSX.Element} The AI article writer component
 */
export default function AIArticleWriter() {
  // State for the active input method
  const [activeMethod, setActiveMethod] = useState('url');
  
  // State for the generated content
  const [generatedContent, setGeneratedContent] = useState(null);
  
  // State for the article to review
  const [articleToReview, setArticleToReview] = useState(null);

  /**
   * Handle the generation of content from a URL
   * @param {Object} data - The URL and optional parameters
   */
  const handleUrlGeneration = async (data) => {
    // Simulate processing delay
    setGeneratedContent({ status: 'processing', message: 'Processing content from URL...' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Placeholder function to simulate content extraction and AI processing
      const extractedContent = `AI generated article based on the URL: ${data.url}\n\n` + 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.\n\n' +
        'The original article discussed cryptocurrency market trends, with focus on Bitcoin\'s recent price movements and institutional adoption. The AI has analyzed the key points and restructured the information to provide a unique perspective while maintaining factual accuracy.\n\n' +
        'Market analysts suggest that the current price action is indicative of a consolidation phase before the next major move. Technical indicators show support levels holding firm, while on-chain metrics indicate accumulation by long-term holders.';
      
      // Create article object
      const article = {
        title: 'AI Analysis: ' + (data.customTitle || 'Latest Cryptocurrency Market Developments'),
        content: extractedContent,
        source: data.url,
        timestamp: new Date().toISOString(),
        status: 'draft'
      };
      
      setArticleToReview(article);
      setGeneratedContent({ status: 'success', article });
    } catch (error) {
      console.error('Error generating content from URL:', error);
      setGeneratedContent({ status: 'error', message: 'Failed to process the URL. Please try again.' });
    }
  };

  /**
   * Handle the generation of content from RSS feeds
   * @param {Object} data - The RSS URLs and optional parameters
   */
  const handleRssGeneration = async (data) => {
    // Simulate processing delay
    setGeneratedContent({ status: 'processing', message: 'Processing content from RSS feeds...' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Parse RSS URLs
      const rssUrls = data.rssUrls.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);
      
      if (rssUrls.length === 0) {
        throw new Error('No valid RSS URLs provided');
      }
      
      // Placeholder function to simulate content extraction and AI processing
      const extractedContent = `AI generated article based on ${rssUrls.length} RSS feeds\n\n` + 
        'This article is a comprehensive summary of multiple news sources, providing a balanced overview of the topics.\n\n' +
        'The collected RSS feeds contained information about recent developments in blockchain technology, focusing on new protocol upgrades, regulatory announcements, and market analysis. Key highlights include upcoming Ethereum protocol changes, regulatory developments in major markets, and analysis of the recent market volatility.\n\n' +
        'Industry experts quoted across these sources suggest that the regulatory landscape is moving toward greater clarity, which could potentially increase institutional adoption in the coming months.';
      
      // Create article object
      const article = {
        title: 'AI Roundup: ' + (data.customTitle || 'Latest Blockchain and Crypto Developments'),
        content: extractedContent,
        source: 'Multiple RSS feeds: ' + rssUrls.join(', '),
        timestamp: new Date().toISOString(),
        status: 'draft'
      };
      
      setArticleToReview(article);
      setGeneratedContent({ status: 'success', article });
    } catch (error) {
      console.error('Error generating content from RSS:', error);
      setGeneratedContent({ status: 'error', message: error.message || 'Failed to process RSS feeds. Please try again.' });
    }
  };

  /**
   * Handle the generation of content from a website
   * @param {Object} data - The website URL and optional parameters
   */
  const handleWebsiteGeneration = async (data) => {
    // Simulate processing delay
    setGeneratedContent({ status: 'processing', message: 'Processing content from website...' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Placeholder function to simulate content extraction and AI processing
      const extractedContent = `AI generated summary based on the website: ${data.websiteUrl}\n\n` + 
        'This article summarizes multiple news pieces from the provided website, offering a comprehensive analysis of recent developments.\n\n' +
        'The website featured several articles about decentralized finance (DeFi), non-fungible tokens (NFTs), and central bank digital currencies (CBDCs). Of particular interest was the coverage of new DeFi protocols aiming to solve scalability issues, innovative NFT use cases beyond digital art, and the progress of CBDC initiatives across different central banks.\n\n' +
        'A common theme across these articles was the growing mainstream acceptance of blockchain technology beyond its association with cryptocurrency speculation. Several pieces highlighted enterprise adoption and the integration of blockchain solutions in traditional industries.';
      
      // Create article object
      const article = {
        title: 'AI Website Analysis: ' + (data.customTitle || 'Trending Topics in Blockchain'),
        content: extractedContent,
        source: data.websiteUrl,
        timestamp: new Date().toISOString(),
        status: 'draft'
      };
      
      setArticleToReview(article);
      setGeneratedContent({ status: 'success', article });
    } catch (error) {
      console.error('Error generating content from website:', error);
      setGeneratedContent({ status: 'error', message: 'Failed to process the website. Please try again.' });
    }
  };

  /**
   * Handle publishing an article
   * @param {Object} article - The article to publish
   * @param {string} status - The publication status ('published' or 'draft')
   */
  const handlePublishArticle = (article, status) => {
    // In a real application, this would call an API to save the article
    alert(`Article "${article.title}" has been saved as ${status}.`);
    // Reset states after publishing
    setGeneratedContent(null);
    setArticleToReview(null);
  };

  /**
   * Render the appropriate input method based on the active method
   */
  const renderInputMethod = () => {
    switch (activeMethod) {
      case 'url':
        return <UrlInput onGenerate={handleUrlGeneration} />;
      case 'rss':
        return <RssInput onGenerate={handleRssGeneration} />;
      case 'website':
        return <WebsiteInput onGenerate={handleWebsiteGeneration} />;
      default:
        return <UrlInput onGenerate={handleUrlGeneration} />;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">AI Article Writer</h1>
      
      {!articleToReview ? (
        <>
          {/* Input method tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <button
                  className={`inline-block py-2 px-4 border-b-2 font-medium text-sm ${
                    activeMethod === 'url'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveMethod('url')}
                >
                  Single URL
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block py-2 px-4 border-b-2 font-medium text-sm ${
                    activeMethod === 'rss'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveMethod('rss')}
                >
                  RSS Feeds
                </button>
              </li>
              <li>
                <button
                  className={`inline-block py-2 px-4 border-b-2 font-medium text-sm ${
                    activeMethod === 'website'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveMethod('website')}
                >
                  Website URL
                </button>
              </li>
            </ul>
          </div>
          
          {/* Render the active input method */}
          {renderInputMethod()}
          
          {/* Processing status */}
          {generatedContent && generatedContent.status === 'processing' && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-700">{generatedContent.message}</span>
              </div>
            </div>
          )}
          
          {/* Error message */}
          {generatedContent && generatedContent.status === 'error' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700">{generatedContent.message}</span>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Render the article review component when an article is ready */
        <ArticleReview 
          article={articleToReview} 
          onPublish={(status) => handlePublishArticle(articleToReview, status)} 
          onCancel={() => {
            setArticleToReview(null);
            setGeneratedContent(null);
          }}
        />
      )}
      
      {/* Tips and information section */}
      {!articleToReview && (
        <div className="mt-8 card p-6 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">About AI Article Writer</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The AI Article Writer helps you generate high-quality cryptocurrency and blockchain content by leveraging AI to analyze and process existing content. Choose from three input methods:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li><strong>Single URL:</strong> Generate a unique article based on a single news article or blog post</li>
            <li><strong>RSS Feeds:</strong> Create a comprehensive roundup based on multiple RSS feeds</li>
            <li><strong>Website URL:</strong> Extract and summarize content from an entire website</li>
          </ul>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            The AI analyzes the source content, extracts key information, and generates a unique article while maintaining factual accuracy. Always review and edit the generated content before publishing.
          </p>
        </div>
      )}
    </div>
  );
}
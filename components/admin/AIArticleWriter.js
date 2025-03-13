import { useState } from 'react';
import UrlInput from './aiArticle/UrlInput';
import RssInput from './aiArticle/RssInput';
import WebsiteInput from './aiArticle/WebsiteInput';
import ContentReview from './aiArticle/ContentReview';

/**
 * AIArticleWriter component - The main component for AI article generation
 * 
 * @returns {JSX.Element} The AI Article Writer component
 */
export default function AIArticleWriter() {
  const [activeTab, setActiveTab] = useState('url');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState('');

  /**
   * Generate content from URL input
   * @param {Object} data - URL input data
   */
  const handleUrlGenerate = async (data) => {
    try {
      setError('');
      setIsGenerating(true);
      // Simulated API call - replace with actual implementation
      const result = await simulateAiGeneration(data, 'url');
      setGeneratedContent(result);
    } catch (err) {
      setError('Failed to generate content: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Generate content from RSS input
   * @param {Object} data - RSS input data
   */
  const handleRssGenerate = async (data) => {
    try {
      setError('');
      setIsGenerating(true);
      // Simulated API call - replace with actual implementation
      const result = await simulateAiGeneration(data, 'rss');
      setGeneratedContent(result);
    } catch (err) {
      setError('Failed to generate content: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Generate content from website input
   * @param {Object} data - Website input data
   */
  const handleWebsiteGenerate = async (data) => {
    try {
      setError('');
      setIsGenerating(true);
      // Simulated API call - replace with actual implementation
      const result = await simulateAiGeneration(data, 'website');
      setGeneratedContent(result);
    } catch (err) {
      setError('Failed to generate content: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Save content as draft
   * @param {Object} data - Content data
   */
  const handleSave = async (data) => {
    try {
      // Placeholder for API call to save draft
      console.log('Saving draft:', data);
      // You would typically make an API call here
      alert('Draft saved successfully!');
    } catch (err) {
      setError('Failed to save draft: ' + err.message);
    }
  };

  /**
   * Publish content
   * @param {Object} data - Content data
   */
  const handlePublish = async (data) => {
    try {
      // Placeholder for API call to publish
      console.log('Publishing article:', data);
      // You would typically make an API call here
      alert('Article published successfully!');
    } catch (err) {
      setError('Failed to publish article: ' + err.message);
    }
  };

  /**
   * Regenerate content
   */
  const handleRegenerate = async () => {
    try {
      setError('');
      setIsGenerating(true);
      // Simulate regenerating based on the last input type
      const result = await simulateAiGeneration(generatedContent.inputData, generatedContent.inputType);
      setGeneratedContent(result);
    } catch (err) {
      setError('Failed to regenerate content: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Article Writer</h1>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        </div>
      )}
      
      {/* Input Method Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 font-medium text-sm mr-2 ${
              activeTab === 'url'
                ? 'border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            URL Input
          </button>
          <button
            onClick={() => setActiveTab('rss')}
            className={`px-4 py-2 font-medium text-sm mr-2 ${
              activeTab === 'rss'
                ? 'border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            RSS Feeds
          </button>
          <button
            onClick={() => setActiveTab('website')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'website'
                ? 'border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Website Crawler
          </button>
        </nav>
      </div>
      
      {/* Input Methods */}
      <div className="mb-8">
        {activeTab === 'url' && <UrlInput onGenerate={handleUrlGenerate} />}
        {activeTab === 'rss' && <RssInput onGenerate={handleRssGenerate} />}
        {activeTab === 'website' && <WebsiteInput onGenerate={handleWebsiteGenerate} />}
      </div>
      
      {/* Content Review */}
      <ContentReview 
        generatedContent={generatedContent}
        onSave={handleSave}
        onPublish={handlePublish}
        onRegenerate={handleRegenerate}
        isLoading={isGenerating}
      />
    </div>
  );
}

/**
 * Simulate AI content generation
 * This is a placeholder function that should be replaced with actual API calls
 * 
 * @param {Object} data - Input data
 * @param {string} type - Input type ('url', 'rss', or 'website')
 * @returns {Promise<Object>} Generated content
 */
async function simulateAiGeneration(data, type) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create a placeholder date for simulation
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  let title, content, sources = [];
  
  // Create content based on input type
  switch (type) {
    case 'url':
      title = `Analysis: ${data.customTitle || 'Latest Developments in Cryptocurrency Market'}`;
      sources = [{ url: data.newsUrl, title: 'Source Article' }];
      break;
    case 'rss':
      title = data.customTitle || 'Roundup: This Week in Crypto';
      sources = data.rssUrls.map(url => ({ url, title: 'RSS Feed' }));
      break;
    case 'website':
      title = data.customTitle || `${data.topicFocus || 'Crypto'} Insights from Top Sources`;
      sources = [{ url: data.websiteUrl, title: 'Website Source' }];
      break;
    default:
      title = 'New Crypto Article';
  }
  
  // Simulate content
  content = `# ${title}

Published on ${dateStr}

## Introduction

The cryptocurrency market continues to evolve at a rapid pace, with new developments emerging daily. This article explores the latest trends and insights in the blockchain and digital asset space.

## Market Analysis

Bitcoin, the leading cryptocurrency by market capitalization, has shown remarkable resilience despite recent market volatility. Analysts point to institutional adoption as a key factor supporting its price stability.

Ethereum, meanwhile, has been gaining momentum due to the growing DeFi ecosystem built on its blockchain. The network's transition to Ethereum 2.0 represents a significant milestone in its development roadmap.

## Regulatory Developments

Regulatory clarity remains a critical concern for the cryptocurrency industry. Recent statements from financial authorities indicate a more nuanced approach to digital asset regulation, balancing innovation with consumer protection.

## Conclusion

As the cryptocurrency ecosystem matures, we can expect continued integration with traditional finance and increased mainstream adoption. Investors should remain vigilant about market developments while focusing on projects with strong fundamentals and real-world utility.`;

  // Return simulated response
  return {
    title,
    content,
    contentScore: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
    sources,
    inputData: data,
    inputType: type,
    metadata: {
      author: 'AI Assistant',
      tags: ['cryptocurrency', 'blockchain', type === 'url' ? 'analysis' : 'news'],
      featuredImage: '',
      seoDescription: `${title} - The latest insights and analysis on cryptocurrency markets and blockchain technology.`,
    }
  };
}
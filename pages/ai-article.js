import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * AI Article Writer page - provides interface for generating AI-assisted content
 * Protected route that requires authentication and admin role
 * 
 * @returns {JSX.Element} The AI article writer component
 */
export default function AIArticleWriter() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    type: 'news',
    tone: 'informative',
    wordCount: 600,
    keywords: '',
    instructions: '',
  });
  const [generatedContent, setGeneratedContent] = useState('');

  // Check authentication and authorization
  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false);
      
      // If user is not logged in, redirect to login
      if (!session) {
        router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
      }
      // Check if user has admin role
      else if (session && session.user?.role !== 'admin') {
        router.push('/unauthorized');
      }
    }
  }, [session, status, router]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mock function to simulate AI content generation
  const generateAIContent = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // In a real application, this would be an API call to an AI service
      // const response = await fetch('/api/generate-article', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      // setGeneratedContent(data.content);
      
      // For demonstration, simulate API delay and return mock content
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const topics = {
        'bitcoin': 'Bitcoin has continued to dominate the cryptocurrency market, maintaining its position as the leading digital asset by market capitalization. Recent price movements have shown resilience despite broader market volatility, with institutional investors continuing to accumulate BTC as a hedge against inflation and economic uncertainty.\n\nMarket analysts point to several factors contributing to Bitcoin\'s current trajectory. The ongoing adoption by major financial institutions, regulatory clarity in key markets, and the asset\'s limited supply of 21 million coins all reinforce its value proposition as "digital gold."\n\n"What we\'re seeing with Bitcoin right now is a maturation phase," explains cryptocurrency researcher Sarah Chen. "After surviving multiple market cycles, Bitcoin has established itself as a legitimate asset class that\'s increasingly being incorporated into traditional investment portfolios."\n\nOn-chain metrics also suggest a healthy network, with hash rate reaching all-time highs—indicating strong security and continued investment in mining infrastructure. Meanwhile, the number of active addresses continues to grow steadily, suggesting ongoing adoption despite price fluctuations.\n\nAs central banks worldwide continue expansionary monetary policies, Bitcoin\'s fixed supply mechanism has attracted investors looking for inflation-resistant assets. Corporate treasury strategies now regularly include Bitcoin allocations, with several publicly traded companies maintaining significant holdings on their balance sheets.\n\nWhile volatility remains a characteristic of the cryptocurrency market, Bitcoin\'s increasing correlation with traditional risk assets has somewhat diminished, potentially signaling its evolution into a more distinct asset class with unique market drivers.',
        'ethereum': 'Ethereum continues to cement its position as the leading smart contract platform in the cryptocurrency ecosystem, despite growing competition from alternative layer-1 blockchains. The network\'s transition to proof-of-stake through "The Merge" marked a significant milestone in its technical roadmap, reducing energy consumption by over 99% and laying the groundwork for future scaling solutions.\n\nDapp development on Ethereum remains robust, with total value locked (TVL) across decentralized finance protocols showing resilience even during market downturns. The network\'s composability—allowing different applications to seamlessly interact—continues to be a key advantage that attracts developers despite higher transaction costs compared to competitors.\n\n"Ethereum\'s developer ecosystem is unmatched," notes blockchain consultant Michael Rodriguez. "The network effects created by years of building infrastructure, tools, and knowledge make it extremely difficult for competing chains to replicate the same environment, even with technical advantages."\n\nThe upcoming "Surge, Verge, Purge, and Splurge" upgrades aim to address Ethereum\'s most pressing challenges, particularly around scalability and gas fees. Layer-2 scaling solutions like Optimism and Arbitrum have already gained significant traction, offering lower fees while inheriting Ethereum\'s security guarantees.\n\nInstitutional interest in Ethereum has grown substantially, with regulated futures and options products now available through traditional finance channels. The introduction of these instruments has created new avenues for price discovery and risk management for larger investors.\n\nAs the broader Web3 ecosystem continues to evolve, Ethereum\'s first-mover advantage in programmable blockchain technology positions it well to capture value across multiple sectors, from finance and gaming to identity and supply chain management.',
        'defi': 'Decentralized Finance (DeFi) continues to evolve rapidly, with innovations pushing the boundaries of what\'s possible in permissionless financial systems. Despite market volatility affecting total value locked (TVL), core DeFi primitives around lending, borrowing, and decentralized exchange have demonstrated remarkable resilience and product-market fit.\n\nRecent developments in the sector have focused on improving capital efficiency, risk management, and regulatory compliance. Real-world asset (RWA) tokenization has emerged as a significant trend, bridging traditional finance with DeFi rails by bringing tokenized bonds, private credit, and other conventional assets on-chain.\n\n"We\'re witnessing the natural maturation of DeFi," explains financial technology researcher Priya Sharma. "After the initial experimentation phase, protocols are now focused on sustainable business models, better risk assessment, and creating products that appeal beyond the crypto-native audience."\n\nInstitutional participation in DeFi has increased substantially, with dedicated platforms catering to KYC/AML requirements while preserving the benefits of decentralized infrastructure. This has introduced significant liquidity to the ecosystem while pushing existing protocols to adapt to institutional compliance needs.\n\nSecurity remains a critical focus, with formal verification of smart contracts becoming standard practice among leading protocols. Insurance solutions have also evolved to provide more comprehensive coverage against smart contract vulnerabilities and exploits.\n\nCross-chain interoperability protocols have advanced significantly, allowing liquidity and assets to flow more freely between different blockchain ecosystems. This development has reduced fragmentation in the DeFi landscape and improved the user experience through more seamless interactions across platforms.',
      };
      
      // Generate mock content based on the topic
      const topicKey = Object.keys(topics).find(key => formData.topic.toLowerCase().includes(key));
      const content = topicKey ? topics[topicKey] : 'Generated content would appear here based on your specified parameters. This is a placeholder for demonstration purposes. In a production environment, this would connect to an AI service API like OpenAI to generate relevant cryptocurrency content based on your inputs.\n\nThe content would be tailored to your selected parameters:\n- Topic: ' + formData.topic + '\n- Type: ' + formData.type + '\n- Tone: ' + formData.tone + '\n- Word Count: Approximately ' + formData.wordCount + ' words\n- Keywords: ' + (formData.keywords || 'None specified') + '\n\nThe AI would analyze current market trends, recent news, and historical data to create an informative and engaging article ready for review and publication.';
      
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('An error occurred while generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle publishing the generated content (mock function)
  const handlePublish = () => {
    alert('In a production environment, this would save the article to your CMS and optionally publish it to your website.');
  };

  // If loading or not authenticated, show loading state
  if (isLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {isLoading ? 'Loading...' : 'Please sign in to access the AI Article Writer'}
          </h2>
          {!isLoading && !session && (
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>AI Article Writer | CoinDailyNews</title>
        <meta name="description" content="AI-powered article generation tool for CoinDailyNews" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">AI Article Writer</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Article Parameters</h2>
              
              <form onSubmit={generateAIContent}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Topic or Title*
                    </label>
                    <input
                      type="text"
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      className="input w-full"
                      placeholder="e.g., Bitcoin price analysis, Ethereum 2.0 explained"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Article Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="input w-full"
                    >
                      <option value="news">News Article</option>
                      <option value="analysis">Analysis</option>
                      <option value="tutorial">Tutorial/Guide</option>
                      <option value="opinion">Opinion/Editorial</option>
                      <option value="review">Review</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tone
                    </label>
                    <select
                      id="tone"
                      name="tone"
                      value={formData.tone}
                      onChange={handleInputChange}
                      className="input w-full"
                    >
                      <option value="informative">Informative</option>
                      <option value="analytical">Analytical</option>
                      <option value="educational">Educational</option>
                      <option value="conversational">Conversational</option>
                      <option value="professional">Professional</option>
                      <option value="enthusiastic">Enthusiastic</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Approximate Word Count
                    </label>
                    <input
                      type="number"
                      id="wordCount"
                      name="wordCount"
                      value={formData.wordCount}
                      onChange={handleInputChange}
                      className="input w-full"
                      min="100"
                      max="2000"
                      step="100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      id="keywords"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      className="input w-full"
                      placeholder="e.g., cryptocurrency, blockchain, investing"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional Instructions
                    </label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      rows="4"
                      className="input w-full"
                      placeholder="Any specific points to include or style guidelines"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="btn btn-primary w-full flex justify-center items-center"
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating Content...
                        </>
                      ) : (
                        'Generate Article'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Output Area */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold dark:text-white">Generated Content</h2>
                {generatedContent && (
                  <div className="space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedContent)}
                      className="btn btn-secondary text-sm py-1"
                    >
                      Copy
                    </button>
                    <button
                      onClick={handlePublish}
                      className="btn btn-primary text-sm py-1"
                    >
                      Publish
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 min-h-[500px] max-h-[500px] overflow-y-auto">
                {generatedContent ? (
                  <div className="prose dark:prose-invert max-w-none">
                    {generatedContent.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <p className="text-center">
                      Generated content will appear here.
                      <br />
                      Fill in the parameters and click "Generate Article".
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Tips Section */}
          <div className="mt-8 card p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Tips for Effective AI Article Generation</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Be specific with your topic - "Bitcoin price prediction for Q4 2023" is better than just "Bitcoin"</li>
              <li>Include relevant keywords to ensure the content targets appropriate search terms</li>
              <li>Use additional instructions to specify any particular perspectives or data points to include</li>
              <li>Always review and edit AI-generated content before publishing to ensure accuracy and quality</li>
              <li>For technical topics, provide specific technical details in your instructions</li>
              <li>Consider your audience's knowledge level and specify if the content should be beginner-friendly or for experts</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
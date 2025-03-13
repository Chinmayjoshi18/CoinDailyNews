import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PriceTicker from '../components/PriceTicker';
import ArticleCard, { articleCardPlaceholder } from '../components/ArticleCard';

/**
 * Home page component - main landing page for the website
 * 
 * @returns {JSX.Element} The homepage component
 */
export default function Home() {
  // Mock featured articles data
  // In a real application, this would come from an API or CMS
  const [featuredArticles] = useState([
    {
      id: 'bitcoin-adoption-2023',
      title: 'Bitcoin Adoption Reaches All-Time High in Emerging Markets',
      summary: 'New data shows cryptocurrency adoption is accelerating across developing nations, with Bitcoin leading the charge as both a store of value and medium of exchange.',
      imageUrl: 'https://source.unsplash.com/random/800x400/?bitcoin',
      category: 'Adoption',
      author: 'Michael Chen',
      authorImageUrl: 'https://source.unsplash.com/random/100x100/?man',
      publishDate: '2023-03-15T10:30:00Z',
      readTime: 5,
      featured: true,
    },
    {
      id: 'defi-security-risks',
      title: 'Security Vulnerabilities in DeFi: What You Need to Know',
      summary: 'As decentralized finance continues to grow, security researchers highlight important vulnerabilities that users and developers should be aware of.',
      imageUrl: 'https://source.unsplash.com/random/800x400/?cybersecurity',
      category: 'Security',
      author: 'Sarah Johnson',
      authorImageUrl: 'https://source.unsplash.com/random/100x100/?woman',
      publishDate: '2023-03-12T14:45:00Z',
      readTime: 7,
      featured: true,
    },
    {
      id: 'ethereum-merge-impact',
      title: 'Six Months After the Merge: Ethereum\'s New Landscape',
      summary: 'A comprehensive analysis of how Ethereum\'s transition to proof-of-stake has affected the network, developers, and the broader crypto ecosystem.',
      imageUrl: 'https://source.unsplash.com/random/800x400/?ethereum',
      category: 'Technology',
      author: 'David Williams',
      authorImageUrl: 'https://source.unsplash.com/random/100x100/?person',
      publishDate: '2023-03-10T09:15:00Z',
      readTime: 10,
      featured: true,
    },
  ]);

  // Mock latest news articles data
  const [latestArticles] = useState([
    {
      id: 'sec-crypto-regulations',
      title: 'SEC Announces New Regulatory Framework for Cryptocurrency Exchanges',
      summary: 'The Securities and Exchange Commission has released new guidelines for cryptocurrency exchanges operating in the United States.',
      imageUrl: 'https://source.unsplash.com/random/800x400/?regulation',
      category: 'Regulation',
      author: 'Jessica Martinez',
      authorImageUrl: 'https://source.unsplash.com/random/100x100/?woman',
      publishDate: '2023-03-16T16:20:00Z',
      readTime: 4,
    },
    {
      id: 'blockchain-supply-chain',
      title: 'Major Retailers Adopt Blockchain for Supply Chain Tracking',
      summary: 'Several leading retail chains have announced new initiatives leveraging blockchain technology to improve supply chain transparency and efficiency.',
      imageUrl: 'https://source.unsplash.com/random/800x400/?supplychain',
      category: 'Business',
      author: 'Robert Thompson',
      authorImageUrl: 'https://source.unsplash.com/random/100x100/?man',
      publishDate: '2023-03-14T11:30:00Z',
      readTime: 6,
    },
    {
      id: 'nft-market-recovery',
      title: 'NFT Market Shows Signs of Recovery After Prolonged Downturn',
      summary: 'After months of declining sales volumes, the NFT market is showing signs of renewed activity with several high-profile collections seeing increased interest.',
      imageUrl: 'https://source.unsplash.com/random/800x400/?nft',
      category: 'NFTs',
      author: 'Emma Wilson',
      authorImageUrl: 'https://source.unsplash.com/random/100x100/?woman',
      publishDate: '2023-03-13T13:45:00Z',
      readTime: 5,
    },
    {
      id: 'central-bank-digital-currency',
      title: 'European Central Bank Accelerates CBDC Development',
      summary: 'The ECB has announced plans to speed up development of the digital euro, with pilot testing scheduled to begin next quarter.',
      imageUrl: 'https://source.unsplash.com/random/800x400/?bank',
      category: 'CBDC',
      author: 'Thomas Miller',
      authorImageUrl: 'https://source.unsplash.com/random/100x100/?man',
      publishDate: '2023-03-11T10:15:00Z',
      readTime: 8,
    },
  ]);

  return (
    <div>
      <Head>
        <title>CoinDailyNews - Latest Cryptocurrency News and Analysis</title>
        <meta 
          name="description" 
          content="Get the latest cryptocurrency news, market analysis, and price updates from CoinDailyNews" 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <PriceTicker />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-blue-900 to-slate-900 text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Trusted Source for Cryptocurrency News
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Stay informed with the latest crypto news, market analysis, and expert insights.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
                Subscribe Now
              </button>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-12 bg-gray-50 dark:bg-slate-900">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Featured Articles
              </h2>
              <a href="/news" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Latest News
              </h2>
              <a href="/news" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated with CoinDailyNews</h2>
              <p className="text-xl mb-8">
                Get the latest cryptocurrency news and insights delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-800 hover:bg-blue-900 rounded-lg font-semibold transition duration-300"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-sm text-blue-100">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
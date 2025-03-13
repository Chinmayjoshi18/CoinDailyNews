import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * ArticleList component for the admin panel
 * Displays a table of articles with options to edit or delete
 * 
 * @returns {JSX.Element} The article list component
 */
export default function ArticleList() {
  // Mock articles data
  const [articles, setArticles] = useState([
    {
      id: 'bitcoin-adoption-2023',
      title: 'Bitcoin Adoption Reaches All-Time High in Emerging Markets',
      category: 'Cryptocurrency',
      subCategory: 'Adoption',
      author: 'Michael Chen',
      status: 'published',
      publishedAt: '2023-03-15T10:30:00Z',
      featured: true,
      views: 4573
    },
    {
      id: 'defi-security-risks',
      title: 'Security Vulnerabilities in DeFi: What You Need to Know',
      category: 'Blockchain',
      subCategory: 'Security',
      author: 'Sarah Johnson',
      status: 'published',
      publishedAt: '2023-03-12T14:45:00Z',
      featured: true,
      views: 3218
    },
    {
      id: 'ethereum-merge-impact',
      title: 'Six Months After the Merge: Ethereum\'s New Landscape',
      category: 'Cryptocurrency',
      subCategory: 'Technology',
      author: 'David Williams',
      status: 'published',
      publishedAt: '2023-03-10T09:15:00Z',
      featured: true,
      views: 5132
    },
    {
      id: 'sec-crypto-regulations',
      title: 'SEC Announces New Regulatory Framework for Cryptocurrency Exchanges',
      category: 'Cryptocurrency',
      subCategory: 'Regulation',
      author: 'Jessica Martinez',
      status: 'published',
      publishedAt: '2023-03-16T16:20:00Z',
      featured: false,
      views: 2896
    },
    {
      id: 'blockchain-supply-chain',
      title: 'Major Retailers Adopt Blockchain for Supply Chain Tracking',
      category: 'Blockchain',
      subCategory: 'Business',
      author: 'Robert Thompson',
      status: 'published',
      publishedAt: '2023-03-14T11:30:00Z',
      featured: false,
      views: 1987
    },
    {
      id: 'nft-market-recovery',
      title: 'NFT Market Shows Signs of Recovery After Prolonged Downturn',
      category: 'Web3',
      subCategory: 'NFTs',
      author: 'Emma Wilson',
      status: 'published',
      publishedAt: '2023-03-13T13:45:00Z',
      featured: false,
      views: 3421
    },
    {
      id: 'central-bank-digital-currency',
      title: 'European Central Bank Accelerates CBDC Development',
      category: 'Cryptocurrency',
      subCategory: 'CBDC',
      author: 'Thomas Miller',
      status: 'published',
      publishedAt: '2023-03-11T10:15:00Z',
      featured: false,
      views: 2543
    },
    {
      id: 'web3-gaming-future',
      title: 'The Future of Gaming: How Web3 is Revolutionizing the Industry',
      category: 'Web3',
      subCategory: 'Gaming',
      author: 'Alex Rodriguez',
      status: 'draft',
      updatedAt: '2023-03-16T11:20:00Z',
      featured: false,
      views: 0
    },
    {
      id: 'ai-crypto-trading',
      title: 'AI-Powered Cryptocurrency Trading: Risks and Opportunities',
      category: 'AI',
      subCategory: 'Trading',
      author: 'Jennifer Lee',
      status: 'draft',
      updatedAt: '2023-03-15T09:45:00Z',
      featured: false,
      views: 0
    }
  ]);
  
  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Handle delete article
  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };
  
  // Handle toggle featured
  const handleToggleFeatured = (id) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, featured: !article.featured } : article
    ));
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter articles based on search and filters
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || article.category === categoryFilter;
    const matchesStatus = statusFilter === '' || article.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle dates
    if (sortBy === 'publishedAt' || sortBy === 'updatedAt') {
      aValue = a.status === 'published' ? new Date(a.publishedAt).getTime() : 
               a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      bValue = b.status === 'published' ? new Date(b.publishedAt).getTime() : 
               b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Get unique categories for filter
  const categories = ['', ...new Set(articles.map(article => article.category))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Article Management</h1>
        <Link 
          href="/admin/articles/new" 
          className="btn btn-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Article
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="card p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="input w-full"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="category"
              className="input w-full"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.filter(cat => cat !== '').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              id="status"
              className="input w-full"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort By
            </label>
            <div className="flex space-x-2">
              <select
                id="sortBy"
                className="input flex-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="publishedAt">Date</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="views">Views</option>
              </select>
              <button
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortOrder === 'asc' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Views
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Featured
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    <Link href={`/admin/articles/edit/${article.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <span className="inline-flex items-center">
                      {article.category}
                      <span className="ml-1 text-xs text-gray-400 dark:text-gray-500">
                        / {article.subCategory}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {article.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {article.status === 'published' 
                      ? formatDate(article.publishedAt)
                      : article.updatedAt ? `Updated ${formatDate(article.updatedAt)}` : 'Not published'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      onClick={() => handleToggleFeatured(article.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        article.featured 
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' 
                          : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                      }`}
                      title={article.featured ? 'Featured' : 'Not Featured'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={article.featured ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        href={`/admin/articles/edit/${article.id}`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {sortedArticles.length === 0 && (
          <div className="py-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No articles found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new article or try a different search.
            </p>
            <div className="mt-6">
              <Link 
                href="/admin/articles/new" 
                className="btn btn-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Article
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
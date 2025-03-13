import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminSidebar from '../components/admin/AdminSidebar';
import Dashboard from '../components/admin/Dashboard';
import ArticleList from '../components/admin/ArticleList';
import ArticleEditor from '../components/admin/ArticleEditor';
import CategoryManagement from '../components/admin/CategoryManagement';
import WebsiteSettings from '../components/admin/WebsiteSettings';
import AIArticleWriter from '../components/admin/AIArticleWriter';
import LoginForm from '../components/admin/LoginForm';

/**
 * Admin panel page - provides access to site administration features
 * Protected route that requires authentication and admin role
 * 
 * @returns {JSX.Element} The admin panel component
 */
export default function AdminPanel() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [articleToEdit, setArticleToEdit] = useState(null);

  // Check if the user is authenticated via localStorage
  // In a real app, this would be done via a session or JWT token
  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('adminUser');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Handle successful login
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Store user data in localStorage
    localStorage.setItem('adminUser', JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
  };

  // Handle edit article
  const handleEditArticle = (article) => {
    setArticleToEdit(article);
    setActiveTab('edit-article');
  };

  // Handle back to article list
  const handleBackToArticles = () => {
    setArticleToEdit(null);
    setActiveTab('articles');
  };

  // Render the appropriate component based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'articles':
        return <ArticleList onEditArticle={handleEditArticle} />;
      case 'new-article':
        return <ArticleEditor onBack={handleBackToArticles} />;
      case 'edit-article':
        return <ArticleEditor article={articleToEdit} onBack={handleBackToArticles} />;
      case 'categories':
        return <CategoryManagement />;
      case 'ai-writer':
        return <AIArticleWriter />;
      case 'settings':
        return <WebsiteSettings />;
      default:
        return <Dashboard />;
    }
  };

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div>
        <Head>
          <title>Admin Login | CoinDailyNews</title>
          <meta name="description" content="Admin panel login for CoinDailyNews" />
        </Head>

        <Header />

        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-12">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Panel</h1>
              <LoginForm onLogin={handleLogin} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Admin Panel | CoinDailyNews</title>
        <meta name="description" content="Admin panel for CoinDailyNews" />
      </Head>

      <Header />

      <div className="flex bg-gray-50 dark:bg-slate-900 min-h-screen">
        <AdminSidebar onLogout={handleLogout} />
        
        <div className="flex-1 p-6 lg:p-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">Admin Panel</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user?.name || 'Admin'}
              </p>
            </div>
            
            {/* Action buttons based on active tab */}
            <div className="flex space-x-2">
              {activeTab === 'articles' && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setActiveTab('new-article')}
                >
                  New Article
                </button>
              )}
              {(activeTab === 'new-article' || activeTab === 'edit-article') && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleBackToArticles}
                >
                  Back to Articles
                </button>
              )}
            </div>
          </div>

          {/* Tab navigation */}
          {!(activeTab === 'new-article' || activeTab === 'edit-article') && (
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                  <button
                    className={`inline-block py-2 px-4 border-b-2 font-medium text-sm ${
                      activeTab === 'dashboard'
                        ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    className={`inline-block py-2 px-4 border-b-2 font-medium text-sm ${
                      activeTab === 'articles'
                        ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('articles')}
                  >
                    Articles
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    className={`inline-block py-2 px-4 border-b-2 font-medium text-sm ${
                      activeTab === 'ai-writer'
                        ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('ai-writer')}
                  >
                    AI Writer
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    className={`inline-block py-2 px-4 border-b-2 font-medium text-sm ${
                      activeTab === 'categories'
                        ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('categories')}
                  >
                    Categories
                  </button>
                </li>
                <li>
                  <button
                    className={`inline-block py-2 px-4 border-b-2 font-medium text-sm ${
                      activeTab === 'settings'
                        ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    Settings
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Tab content */}
          <div className="pb-8">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
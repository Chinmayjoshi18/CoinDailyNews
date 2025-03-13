import { useState } from 'react';

/**
 * Dashboard component for the admin panel
 * Displays overview statistics and recent activity
 * 
 * @returns {JSX.Element} The dashboard component
 */
export default function Dashboard() {
  // Mock statistics data
  const [stats] = useState({
    articles: {
      total: 156,
      published: 142,
      drafts: 14,
      trending: 8,
      percentChange: 12
    },
    users: {
      total: 3248,
      active: 2847,
      new: 142,
      percentChange: 8
    },
    engagement: {
      comments: 854,
      likes: 4782,
      shares: 1243,
      percentChange: 24
    },
    newsletter: {
      subscribers: 5247,
      openRate: 32.4,
      clickRate: 8.7,
      percentChange: 18
    }
  });

  // Mock recent activity data
  const [recentActivity] = useState([
    {
      id: 1,
      type: 'article_published',
      title: 'SEC Announces New Regulatory Framework for Cryptocurrency Exchanges',
      user: 'admin@example.com',
      timestamp: '2023-03-16T16:20:00Z'
    },
    {
      id: 2,
      type: 'user_registered',
      user: 'newuser@example.com',
      timestamp: '2023-03-15T14:35:00Z'
    },
    {
      id: 3,
      type: 'comment_approved',
      article: 'Bitcoin Adoption Reaches All-Time High in Emerging Markets',
      user: 'moderator@example.com',
      timestamp: '2023-03-15T13:12:00Z'
    },
    {
      id: 4,
      type: 'article_edited',
      title: 'NFT Market Shows Signs of Recovery After Prolonged Downturn',
      user: 'editor@example.com',
      timestamp: '2023-03-14T10:45:00Z'
    },
    {
      id: 5,
      type: 'article_draft',
      title: 'The Impact of Central Bank Digital Currencies on Global Finance',
      user: 'writer@example.com',
      timestamp: '2023-03-14T09:20:00Z'
    }
  ]);

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Activity type icons
  const getActivityIcon = (type) => {
    switch (type) {
      case 'article_published':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'user_registered':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'comment_approved':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        );
      case 'article_edited':
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case 'article_draft':
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Articles Stats */}
        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Articles</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.articles.total}</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">↑ {stats.articles.percentChange}%</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Published: {stats.articles.published}</span>
            <span className="text-gray-500 dark:text-gray-400">Drafts: {stats.articles.drafts}</span>
          </div>
        </div>

        {/* Users Stats */}
        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.users.active}</h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">↑ {stats.users.percentChange}%</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Total: {stats.users.total}</span>
            <span className="text-gray-500 dark:text-gray-400">New: {stats.users.new}</span>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Comments</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.engagement.comments}</h3>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">↑ {stats.engagement.percentChange}%</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Likes: {stats.engagement.likes}</span>
            <span className="text-gray-500 dark:text-gray-400">Shares: {stats.engagement.shares}</span>
          </div>
        </div>

        {/* Newsletter Stats */}
        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Newsletter Subscribers</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.newsletter.subscribers}</h3>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">↑ {stats.newsletter.percentChange}%</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Open Rate: {stats.newsletter.openRate}%</span>
            <span className="text-gray-500 dark:text-gray-400">Click Rate: {stats.newsletter.clickRate}%</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-start">
              {getActivityIcon(activity.type)}
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.type === 'user_registered' 
                      ? 'New User Registration' 
                      : activity.title || (activity.article ? `Comment on "${activity.article}"` : 'Activity')}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(activity.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activity.user}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-slate-800 px-6 py-3 text-right">
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
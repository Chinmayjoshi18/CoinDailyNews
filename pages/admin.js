import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Admin panel page - provides access to site administration features
 * Protected route that requires authentication and admin role
 * 
 * @returns {JSX.Element} The admin panel component
 */
export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication and authorization
  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false);
      
      // If user is not logged in, redirect to login
      if (!session) {
        // Keep track of where the user was trying to go for after login
        router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
      }
      // Check if user has admin role
      else if (session && session.user?.role !== 'admin') {
        router.push('/unauthorized');
      }
    }
  }, [session, status, router]);

  // If loading or not authenticated, show loading state
  if (isLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {isLoading ? 'Loading...' : 'Please sign in to access the admin panel'}
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

  // If user doesn't have admin role, this would already be redirected by the useEffect

  return (
    <div>
      <Head>
        <title>Admin Panel | CoinDailyNews</title>
        <meta name="description" content="Admin panel for CoinDailyNews" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Panel</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Content Management Card */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Content Management</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/admin/articles" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Manage Articles
                  </a>
                </li>
                <li>
                  <a href="/admin/categories" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Manage Categories
                  </a>
                </li>
                <li>
                  <a href="/admin/media" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Media Library
                  </a>
                </li>
                <li>
                  <a href="/ai-article" className="text-blue-600 dark:text-blue-400 hover:underline">
                    AI Article Writer
                  </a>
                </li>
              </ul>
            </div>

            {/* User Management Card */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">User Management</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/admin/users" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Manage Users
                  </a>
                </li>
                <li>
                  <a href="/admin/roles" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Manage Roles
                  </a>
                </li>
                <li>
                  <a href="/admin/permissions" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Permissions
                  </a>
                </li>
              </ul>
            </div>

            {/* Site Settings Card */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Site Settings</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/admin/settings/general" className="text-blue-600 dark:text-blue-400 hover:underline">
                    General Settings
                  </a>
                </li>
                <li>
                  <a href="/admin/settings/appearance" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Appearance
                  </a>
                </li>
                <li>
                  <a href="/admin/settings/api-keys" className="text-blue-600 dark:text-blue-400 hover:underline">
                    API Keys
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Stats Section */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="card p-6">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Articles</h3>
              <p className="text-3xl font-bold mt-2 dark:text-white">142</p>
              <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium">Active Users</h3>
              <p className="text-3xl font-bold mt-2 dark:text-white">2,847</p>
              <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium">Comments</h3>
              <p className="text-3xl font-bold mt-2 dark:text-white">854</p>
              <p className="text-sm text-green-600 mt-2">↑ 24% from last month</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium">Newsletter Subscribers</h3>
              <p className="text-3xl font-bold mt-2 dark:text-white">5,247</p>
              <p className="text-sm text-green-600 mt-2">↑ 18% from last month</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
          <div className="card overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Article Published
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    admin@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    Mar 16, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    "SEC Announces New Regulatory Framework..."
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    User Registration
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    newuser@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    Mar 15, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    New user registered
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Comment Approved
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    moderator@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    Mar 15, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    Comment approved on "Bitcoin Adoption Reaches All-Time High..."
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
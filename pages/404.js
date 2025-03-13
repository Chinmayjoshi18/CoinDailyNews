import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Custom 404 Not Found page
 * Displayed when a user attempts to access a route that doesn't exist
 * 
 * @returns {JSX.Element} The 404 error page component
 */
export default function Custom404() {
  return (
    <div>
      <Head>
        <title>Page Not Found | CoinDailyNews</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col items-center justify-center py-12">
        <div className="container max-w-lg text-center">
          <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="space-y-4">
            <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
              Go to Homepage
            </Link>
            
            <div className="py-2">
              <span className="text-gray-500 dark:text-gray-400">or</span>
            </div>
            
            <div className="space-x-4">
              <Link href="/news" className="text-blue-600 dark:text-blue-400 hover:underline">
                Latest News
              </Link>
              <Link href="/markets" className="text-blue-600 dark:text-blue-400 hover:underline">
                Markets
              </Link>
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
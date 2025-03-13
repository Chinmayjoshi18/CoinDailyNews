import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

/**
 * Header component containing the site navigation, logo, and search functionality
 * Responsive design with mobile menu toggle
 * 
 * @returns {JSX.Element} The header component
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Placeholder for search functionality
    console.log('Search for:', searchQuery);
    // TODO: Implement search functionality
  };

  return (
    <header className="bg-white shadow-md dark:bg-slate-800">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                CoinDaily<span className="text-gray-700 dark:text-gray-200">News</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              News
            </Link>
            <Link href="/markets" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Markets
            </Link>
            <Link href="/analysis" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Analysis
            </Link>
            {session && session.user?.role === 'admin' && (
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                Admin
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search articles..."
                className="input w-48 lg:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Search
              </button>
            </form>
          </div>

          {/* Authentication */}
          <div className="hidden md:block">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu - simple burger menu */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon for menu close - X shape */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <div className="flex flex-col space-y-4 px-2 pb-3 pt-2">
            <Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              News
            </Link>
            <Link href="/markets" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Markets
            </Link>
            <Link href="/analysis" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Analysis
            </Link>
            {session && session.user?.role === 'admin' && (
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                Admin
              </Link>
            )}
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-2">
              <input
                type="text"
                placeholder="Search articles..."
                className="input w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Search
              </button>
            </form>

            {/* Mobile Authentication */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {session ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Signed in as {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
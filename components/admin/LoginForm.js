import { useState } from 'react';

/**
 * LoginForm component for admin panel authentication
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onLogin - Function to call on successful login
 * @returns {JSX.Element} The login form component
 */
export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for demo credentials (in a real app, this would be an API call)
      if (
        (email === 'admin@example.com' && password === 'admin123') ||
        (email === 'editor@example.com' && password === 'editor123')
      ) {
        // Call the onLogin callback with user info
        onLogin({
          email,
          role: email === 'admin@example.com' ? 'admin' : 'editor',
          name: email === 'admin@example.com' ? 'Admin User' : 'Editor User',
        });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Admin Login
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn btn-primary"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Demo Credentials</h3>
        <div className="mt-2 space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Admin: admin@example.com / admin123</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Editor: editor@example.com / editor123</p>
        </div>
      </div>
    </div>
  );
}
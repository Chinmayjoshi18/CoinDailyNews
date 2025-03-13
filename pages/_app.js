import '../styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

/**
 * Main application component that wraps all pages
 * Sets up global providers and components that should be present on all pages
 * 
 * @param {Object} props - Component props
 * @param {React.Component} props.Component - The active page component
 * @param {Object} props.pageProps - Props for the page component
 * @returns {JSX.Element} Rendered application
 */
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>CoinDailyNews - Latest Cryptocurrency News and Analysis</title>
        <meta name="description" content="Get the latest cryptocurrency news, market analysis, and price updates from CoinDailyNews" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph meta tags for better social sharing */}
        <meta property="og:title" content="CoinDailyNews - Latest Cryptocurrency News" />
        <meta property="og:description" content="Get the latest cryptocurrency news, market analysis, and price updates from CoinDailyNews" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://coindailynews.vercel.app" />
        <meta property="og:image" content="https://coindailynews.vercel.app/og-image.jpg" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Render the active page */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
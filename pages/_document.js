import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom Document component for additional HTML document configuration
 * This is rendered on the server side and used to augment your application's <html> and <body> tags
 * 
 * @returns {JSX.Element} Customized HTML document
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add any additional global head elements here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
# CoinDailyNews

A production-ready Next.js project for a cryptocurrency news and content platform. This application provides the latest cryptocurrency news, market analysis, and AI-generated content.

## Project Overview

CoinDailyNews is built with modern web technologies, focusing on performance, scalability, and developer experience. The platform offers:

- Latest cryptocurrency news and analysis
- Real-time cryptocurrency price tracking
- Admin panel for content management
- AI-assisted article generation
- Responsive design with dark mode support

## Project Structure

```
├── components/                # Reusable UI components
│   ├── ArticleCard.js         # Card component for displaying article summaries
│   ├── Footer.js              # Site-wide footer with navigation and newsletter signup
│   ├── Header.js              # Site header with navigation and search
│   └── PriceTicker.js         # Real-time cryptocurrency price ticker component
├── pages/                     # Application pages and API routes
│   ├── _app.js                # Custom App component for global layout
│   ├── _document.js           # Custom Document component
│   ├── admin.js               # Admin panel for site management
│   ├── ai-article.js          # AI-assisted article generation tool
│   └── index.js               # Homepage with featured articles and latest news
├── public/                    # Static assets like images and icons
├── styles/                    # Global stylesheets and CSS modules
│   └── globals.css            # Global CSS styles with Tailwind integration
├── .env.local.example         # Example environment variables file
├── next.config.js             # Next.js configuration
├── package.json               # Project dependencies and scripts
├── postcss.config.js          # PostCSS configuration for Tailwind
└── tailwind.config.js         # Tailwind CSS configuration
```

## Technologies Used

- **Next.js**: React framework for production
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Next Auth**: Authentication for Next.js
- **Axios**: Promise-based HTTP client

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chinmayjoshi18/CoinDailyNews.git
   cd CoinDailyNews
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Then edit .env.local with your specific values
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Vercel Deployment

The easiest way to deploy this application is using Vercel, the platform built by the creators of Next.js:

1. Push your code to a Git provider (GitHub, GitLab, or BitBucket)
2. Import the project into Vercel: https://vercel.com/import
3. Vercel will detect that you're using Next.js and set up the build configuration automatically
4. Add your environment variables in the Vercel project settings
5. Deploy!

### Environment Variables

Make sure to set the following environment variables in your production environment:

- `NEXT_PUBLIC_APP_URL`: The public URL of your application
- `NEXT_PUBLIC_COINMARKETCAP_API_KEY`: API key for CoinMarketCap data
- `NEXT_PUBLIC_COINGECKO_API_KEY`: API key for CoinGecko data
- `NEXTAUTH_SECRET`: A random string for NextAuth.js encryption
- `NEXTAUTH_URL`: The canonical URL of your website
- `DATABASE_URL`: Connection string for your database (if using one)
- `OPENAI_API_KEY`: API key for OpenAI (for the AI article generator)

## Features

- **Real-time Price Ticker**: Display live cryptocurrency prices
- **Featured Articles**: Highlight important news and analysis
- **Admin Panel**: Manage content, users, and site settings
- **AI Article Generator**: Create content with AI assistance
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode Support**: Built-in light and dark theme
- **SEO Optimized**: Proper metadata and structured data
- **Authentication**: User authentication with NextAuth.js

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [NextAuth.js](https://next-auth.js.org/)
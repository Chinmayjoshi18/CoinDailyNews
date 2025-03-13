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
│   ├── PriceTicker.js         # Real-time cryptocurrency price ticker component
│   └── admin/                 # Admin panel components
│       ├── AdminSidebar.js    # Sidebar navigation for admin panel
│       ├── ArticleEditor.js   # Form for creating and editing articles
│       ├── ArticleList.js     # Table display of all articles with management options
│       ├── CategoryManagement.js # Interface for managing categories and subcategories
│       ├── Dashboard.js       # Admin dashboard with statistics and recent activity
│       ├── LoginForm.js       # Authentication form for admin access
│       ├── WebsiteSettings.js # Form for managing site-wide settings
│       ├── AIArticleWriter.js # Main component for AI article generation
│       └── aiArticle/         # AI Article Writer subcomponents
│           ├── UrlInput.js    # Form for generating content from a URL
│           ├── RssInput.js    # Form for generating content from RSS feeds
│           ├── WebsiteInput.js # Form for generating content from websites
│           └── ContentReview.js # Review and edit AI-generated content
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

## Admin Panel Features

The CoinDailyNews platform includes a comprehensive admin panel for content management and site administration. The admin panel features:

### Authentication System
- Secure login for administrators and editors
- Role-based access control
- Demo credentials for testing (admin@example.com/admin123)

### Dashboard
- Overview statistics for articles, users, engagement metrics
- Recent activity log
- Quick access to common administrative tasks

### Article Management
- List view of all articles with filtering and sorting options
- Create, edit, and delete articles
- Rich text editor for article content
- Support for categories, tags, and featured images
- Article status management (draft/published)
- SEO metadata management

### Category Management
- Hierarchical category structure with subcategories
- Create, edit, and delete categories
- Assign colors and descriptions to categories
- Manage relationships between categories

### AI Article Writer
- Generate cryptocurrency news articles using AI
- Three different input methods:
  - **URL Input**: Generate content based on a single news article URL
  - **RSS Feeds**: Create content from multiple RSS feed sources
  - **Website Crawler**: Analyze entire crypto news websites for content
- Content customization options:
  - Adjust article length and style
  - Focus on specific cryptocurrency topics
  - Custom titles and article types
- Content review and editing:
  - Rich text editor for refining AI-generated content
  - Source attribution and fact-checking
  - SEO metadata management
  - Category and tag assignment
  - One-click publishing or saving as draft

### Website Settings
- Site-wide configuration options
- Customize site name, logo, and metadata
- Social media integration
- Footer customization
- Analytics integration

### Accessing the Admin Panel
1. Navigate to /admin in your browser
2. Log in with the provided credentials
3. For demo purposes, use:
   - Admin: admin@example.com / admin123
   - Editor: editor@example.com / editor123

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
  - URL-based content generation
  - RSS feed aggregation and analysis
  - Website crawling and content extraction
  - Multiple content styles and formats
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
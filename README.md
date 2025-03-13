# CoinDailyNews

A production-ready Next.js project for a cryptocurrency news and content platform. This application provides the latest cryptocurrency news, market analysis, and AI-generated content.

## Project Overview

CoinDailyNews is built with modern web technologies, focusing on performance, scalability, and developer experience. The platform offers:

- Latest cryptocurrency news and analysis
- Real-time cryptocurrency price tracking
- Admin panel for content management
- AI-assisted article generation
- Responsive design with dark mode support
- RESTful API for content and data integration

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
│   ├── index.js               # Homepage with featured articles and latest news
│   └── api/                   # API endpoints
│       ├── articles/          # Article management endpoints
│       │   ├── index.js       # List and create articles
│       │   └── [id].js        # Get, update, delete specific article
│       ├── categories/        # Category management endpoints
│       │   ├── index.js       # List and create categories
│       │   └── [id].js        # Get, update, delete specific category
│       ├── settings/          # Website settings endpoints
│       │   └── index.js       # Get and update site settings
│       ├── price-ticker/      # Cryptocurrency price data
│       │   └── index.js       # Get price data for specified coins
│       └── middleware/        # API middleware components
│           └── withErrorHandling.js # Error handling middleware
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

## API Documentation

CoinDailyNews provides a comprehensive REST API that can be used to integrate with other applications or build custom frontends. All API endpoints return JSON responses with consistent formatting.

### Response Format

All API responses follow this standard format:

#### Successful Response
```json
{
  "success": true,
  "data": { ... },  // Response data
  "message": "Optional success message"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "field": "Optional field name for validation errors",
  "statusCode": 400  // HTTP status code
}
```

### Error Handling

The API implements robust error handling through a middleware layer that:

1. Catches and formats all errors consistently
2. Provides appropriate HTTP status codes
3. Includes detailed error messages for debugging
4. Validates request bodies against required fields
5. Logs errors for monitoring and troubleshooting
6. Handles method-specific routing (GET, POST, PUT, DELETE)

The middleware includes:

- **ApiError class**: Custom error class with status code support
- **validateRequest function**: Validates request bodies against required fields
- **methodHandler function**: Routes requests to the appropriate handler based on HTTP method
- **withErrorHandling wrapper**: Applies consistent error handling to all API endpoints

### Authentication

API authentication is handled via JWT tokens. Obtain a token by logging in through the `/api/auth/login` endpoint, then include it in subsequent requests:

```
Authorization: Bearer your_jwt_token
```

### API Endpoints

#### Articles API

**Get Articles**
- **URL**: `/api/articles`
- **Method**: `GET`
- **Query Parameters**:
  - `category` - Filter by category slug
  - `tag` - Filter by tag
  - `status` - Filter by status (`published` (default) or `draft`)
  - `author` - Filter by author
  - `limit` - Number of articles to return (default: 10)
  - `offset` - Pagination offset (default: 0)
  - `sort` - Field to sort by (default: `publishedAt`)
  - `order` - Sort order (`asc` or `desc`)
- **Response**: Array of article objects with pagination metadata

**Get Article by ID**
- **URL**: `/api/articles/[id]`
- **Method**: `GET`
- **Response**: Single article object

**Create Article**
- **URL**: `/api/articles`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Article Title",
    "content": "Article content...",
    "excerpt": "Brief excerpt...",
    "category": "category-slug",
    "author": "Author Name",
    "tags": ["tag1", "tag2"],
    "status": "draft",
    "featuredImage": "/path/to/image.jpg",
    "metaDescription": "SEO description"
  }
  ```
- **Response**: Created article object

**Update Article**
- **URL**: `/api/articles/[id]`
- **Method**: `PUT`
- **Body**: Article fields to update
- **Response**: Updated article object

**Delete Article**
- **URL**: `/api/articles/[id]`
- **Method**: `DELETE`
- **Response**: Success message

#### Categories API

**Get Categories**
- **URL**: `/api/categories`
- **Method**: `GET`
- **Query Parameters**:
  - `parentId` - Filter by parent category ID (use "null" for top-level categories)
  - `includeChildren` - Boolean to include child categories (default: "false")
- **Response**: Array of category objects

**Get Category by ID**
- **URL**: `/api/categories/[id]`
- **Method**: `GET`
- **Query Parameters**:
  - `includeChildren` - Boolean to include child categories (default: "false")
- **Response**: Single category object

**Create Category**
- **URL**: `/api/categories`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Category Name",
    "slug": "category-slug",
    "description": "Category description",
    "color": "#hexcolor",
    "parentId": "parent-id-or-null",
    "order": 1
  }
  ```
- **Response**: Created category object

**Update Category**
- **URL**: `/api/categories/[id]`
- **Method**: `PUT`
- **Body**: Category fields to update
- **Response**: Updated category object

**Delete Category**
- **URL**: `/api/categories/[id]`
- **Method**: `DELETE`
- **Response**: Success message

#### Settings API

**Get Website Settings**
- **URL**: `/api/settings`
- **Method**: `GET`
- **Query Parameters**:
  - `section` - Optional section to retrieve (e.g., "site", "meta", "social")
- **Response**: Website settings object or specific section

**Update Website Settings**
- **URL**: `/api/settings`
- **Method**: `PUT`
- **Body**: Settings fields to update
- **Response**: Updated settings object

#### Price Ticker API

**Get Cryptocurrency Prices**
- **URL**: `/api/price-ticker`
- **Method**: `GET`
- **Query Parameters**:
  - `coins` - Comma-separated list of cryptocurrency IDs (e.g., "bitcoin,ethereum")
  - `currency` - Currency to display prices in (default: "usd")
  - `include_24h_change` - Whether to include 24h price change data (default: "true")
- **Response**: Cryptocurrency price data

**Get Historical Price Data**
- **URL**: `/api/price-ticker`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "coin": "bitcoin",
    "days": 7
  }
  ```
- **Response**: Historical price data for the specified cryptocurrency

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
- **RESTful API**: Comprehensive API for integrating with other systems
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
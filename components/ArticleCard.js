import Image from 'next/image';
import Link from 'next/link';

/**
 * ArticleCard component for displaying a summary of an article
 * 
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique identifier for the article
 * @param {string} props.title - Article title
 * @param {string} props.summary - Brief summary of the article content
 * @param {string} props.imageUrl - URL for the article's feature image
 * @param {string} props.category - Article category (e.g., "News", "Analysis")
 * @param {string} props.author - Author's name
 * @param {string} props.authorImageUrl - URL for the author's profile image
 * @param {string} props.publishDate - Publication date
 * @param {number} props.readTime - Estimated reading time in minutes
 * @param {boolean} props.featured - Whether this is a featured article
 * @returns {JSX.Element} The article card component
 */
export default function ArticleCard({
  id,
  title,
  summary,
  imageUrl,
  category,
  author,
  authorImageUrl,
  publishDate,
  readTime,
  featured = false,
}) {
  // Format the date
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className={`card overflow-hidden flex flex-col h-full ${featured ? 'border-blue-500 border-2' : ''}`}>
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || 'https://source.unsplash.com/random/800x400/?cryptocurrency'}
          alt={title}
          fill
          className="object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded">
            {category}
          </span>
          {featured && (
            <span className="ml-2 bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow">
        <Link href={`/articles/${id}`}>
          <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {summary}
        </p>
      </div>

      {/* Author and Meta Info */}
      <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={authorImageUrl || 'https://source.unsplash.com/random/32x32/?person'}
            alt={author}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{author}</p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span>{formattedDate}</span>
            <span className="mx-1">•</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Placeholder data for the ArticleCard component
 * Can be used for testing or as a fallback when data is not available
 */
export const articleCardPlaceholder = {
  id: 'placeholder-article',
  title: 'The Future of Cryptocurrency: Trends to Watch in 2023',
  summary:
    'An in-depth analysis of emerging trends in the cryptocurrency market and what investors should be watching for in the coming year.',
  imageUrl: 'https://source.unsplash.com/random/800x400/?cryptocurrency',
  category: 'Analysis',
  author: 'Jane Smith',
  authorImageUrl: 'https://source.unsplash.com/random/100x100/?person',
  publishDate: new Date().toISOString(),
  readTime: 5,
  featured: false,
};
/**
 * Middleware for consistent API error handling
 * 
 * This higher-order function wraps API handlers to provide consistent error handling,
 * logging, and response formatting across all endpoints.
 * 
 * @param {Function} handler - The original API route handler function
 * @returns {Function} Enhanced handler with error handling
 */
export default function withErrorHandling(handler) {
  return async function (req, res) {
    try {
      // Set common headers
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      
      // Call the original handler
      return await handler(req, res);
    } catch (error) {
      // Log the error
      console.error(`API Error: [${req.method}] ${req.url}`, error);
      
      // Determine status code based on error type
      const statusCode = error.statusCode || 500;
      
      // Format error response
      const errorResponse = {
        success: false,
        error: statusCode === 500 ? 'Internal server error' : error.message,
      };
      
      // Add stack trace in development
      if (process.env.NODE_ENV === 'development' && statusCode === 500) {
        errorResponse.stack = error.stack;
      }
      
      // Send error response
      return res.status(statusCode).json(errorResponse);
    }
  };
}

/**
 * Custom API error class with status code
 */
export class ApiError extends Error {
  /**
   * Create a new API error
   * 
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

/**
 * Validate request against a set of required fields
 * 
 * @param {Object} body - Request body to validate
 * @param {string[]} requiredFields - Array of required field names
 * @throws {ApiError} If validation fails
 */
export function validateRequest(body, requiredFields) {
  const missingFields = requiredFields.filter(field => !body[field]);
  
  if (missingFields.length > 0) {
    throw new ApiError(
      `Missing required fields: ${missingFields.join(', ')}`, 
      400
    );
  }
}

/**
 * Method handler - Ensure endpoint only accepts specified HTTP methods
 * 
 * @param {Object} handlers - Map of HTTP methods to handler functions
 * @returns {Function} Method router function
 */
export function methodHandler(handlers) {
  return async function(req, res) {
    const method = req.method;
    
    if (!handlers[method]) {
      const allowedMethods = Object.keys(handlers);
      res.setHeader('Allow', allowedMethods);
      throw new ApiError(
        `Method ${method} Not Allowed`, 
        405
      );
    }
    
    return await handlers[method](req, res);
  };
}
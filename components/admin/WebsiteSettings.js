import { useState } from 'react';

/**
 * WebsiteSettings component for managing website configurations
 * 
 * @returns {JSX.Element} The website settings component
 */
export default function WebsiteSettings() {
  // Form state with initial mock values
  const [formData, setFormData] = useState({
    siteName: 'CoinDailyNews',
    siteTagline: 'Your Trusted Source for Cryptocurrency News',
    logoUrl: 'https://example.com/logo.png',
    faviconUrl: 'https://example.com/favicon.ico',
    contactEmail: 'contact@coindailynews.com',
    socialLinks: {
      twitter: 'https://twitter.com/coindailynews',
      facebook: 'https://facebook.com/coindailynews',
      linkedin: 'https://linkedin.com/company/coindailynews',
      instagram: 'https://instagram.com/coindailynews',
    },
    metaTitle: 'CoinDailyNews - Latest Cryptocurrency News and Analysis',
    metaDescription: 'Get the latest cryptocurrency news, market analysis, and price updates from CoinDailyNews',
    footerText: '© 2023 CoinDailyNews. All rights reserved.',
    googleAnalyticsId: 'UA-XXXXXXXXX-X',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle nested social links changes
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));

    // Clear error if it exists
    if (errors[`socialLinks.${name}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`socialLinks.${name}`];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.siteName.trim()) {
      newErrors.siteName = 'Site name is required';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }
    
    if (formData.logoUrl && !/^(https?:\/\/)/.test(formData.logoUrl)) {
      newErrors.logoUrl = 'Logo URL must start with http:// or https://';
    }
    
    if (formData.faviconUrl && !/^(https?:\/\/)/.test(formData.faviconUrl)) {
      newErrors.faviconUrl = 'Favicon URL must start with http:// or https://';
    }
    
    // Validate social links
    Object.entries(formData.socialLinks).forEach(([key, value]) => {
      if (value && !/^(https?:\/\/)/.test(value)) {
        newErrors[`socialLinks.${key}`] = `${key.charAt(0).toUpperCase() + key.slice(1)} URL must start with http:// or https://`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      // In a real application, this would call an API endpoint
      // For this demo, we're just simulating success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccessMessage('Website settings have been saved successfully.');
      
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrors({ submit: 'Failed to save settings. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Website Settings</h1>
      
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded dark:bg-green-900 dark:border-green-800 dark:text-green-200">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-800 dark:text-red-200">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errors.submit}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="card p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Name *
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                className={`input w-full ${errors.siteName ? 'border-red-500 dark:border-red-700' : ''}`}
                value={formData.siteName}
                onChange={handleChange}
              />
              {errors.siteName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.siteName}</p>
              )}
            </div>

            <div>
              <label htmlFor="siteTagline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Tagline
              </label>
              <input
                type="text"
                id="siteTagline"
                name="siteTagline"
                className="input w-full"
                value={formData.siteTagline}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Logo URL
              </label>
              <input
                type="text"
                id="logoUrl"
                name="logoUrl"
                className={`input w-full ${errors.logoUrl ? 'border-red-500 dark:border-red-700' : ''}`}
                placeholder="https://example.com/logo.png"
                value={formData.logoUrl}
                onChange={handleChange}
              />
              {errors.logoUrl && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.logoUrl}</p>
              )}
            </div>

            <div>
              <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Favicon URL
              </label>
              <input
                type="text"
                id="faviconUrl"
                name="faviconUrl"
                className={`input w-full ${errors.faviconUrl ? 'border-red-500 dark:border-red-700' : ''}`}
                placeholder="https://example.com/favicon.ico"
                value={formData.faviconUrl}
                onChange={handleChange}
              />
              {errors.faviconUrl && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.faviconUrl}</p>
              )}
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                className={`input w-full ${errors.contactEmail ? 'border-red-500 dark:border-red-700' : ''}`}
                value={formData.contactEmail}
                onChange={handleChange}
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contactEmail}</p>
              )}
            </div>

            <div>
              <label htmlFor="footerText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Footer Text
              </label>
              <input
                type="text"
                id="footerText"
                name="footerText"
                className="input w-full"
                value={formData.footerText}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="card p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Media</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Twitter URL
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                className={`input w-full ${errors['socialLinks.twitter'] ? 'border-red-500 dark:border-red-700' : ''}`}
                placeholder="https://twitter.com/yourusername"
                value={formData.socialLinks.twitter}
                onChange={handleSocialChange}
              />
              {errors['socialLinks.twitter'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['socialLinks.twitter']}</p>
              )}
            </div>

            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                className={`input w-full ${errors['socialLinks.facebook'] ? 'border-red-500 dark:border-red-700' : ''}`}
                placeholder="https://facebook.com/yourpage"
                value={formData.socialLinks.facebook}
                onChange={handleSocialChange}
              />
              {errors['socialLinks.facebook'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['socialLinks.facebook']}</p>
              )}
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn URL
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                className={`input w-full ${errors['socialLinks.linkedin'] ? 'border-red-500 dark:border-red-700' : ''}`}
                placeholder="https://linkedin.com/company/yourcompany"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialChange}
              />
              {errors['socialLinks.linkedin'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['socialLinks.linkedin']}</p>
              )}
            </div>

            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                className={`input w-full ${errors['socialLinks.instagram'] ? 'border-red-500 dark:border-red-700' : ''}`}
                placeholder="https://instagram.com/yourusername"
                value={formData.socialLinks.instagram}
                onChange={handleSocialChange}
              />
              {errors['socialLinks.instagram'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['socialLinks.instagram']}</p>
              )}
            </div>
          </div>
        </div>

        {/* SEO and Analytics Section */}
        <div className="card p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO & Analytics</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Meta Title
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                className="input w-full"
                value={formData.metaTitle}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Recommended length: 50-60 characters
              </p>
            </div>

            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows="3"
                className="input w-full"
                value={formData.metaDescription}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Recommended length: 150-160 characters
              </p>
            </div>

            <div>
              <label htmlFor="googleAnalyticsId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Google Analytics ID
              </label>
              <input
                type="text"
                id="googleAnalyticsId"
                name="googleAnalyticsId"
                className="input w-full"
                placeholder="UA-XXXXXXXXX-X"
                value={formData.googleAnalyticsId}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
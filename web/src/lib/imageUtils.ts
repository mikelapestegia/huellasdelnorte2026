// utils/imageUtils.ts

/**
 * Utility functions for managing images in the Huellas del Norte application
 */

interface ImageMetadata {
  filename: string;
  category: string;
  altText: string;
  caption?: string;
  license?: string;
  photographer?: string;
}

/**
 * Generates the image path based on category and filename
 */
export const getImagePath = (category: string, filename: string): string => {
  // Convert category to kebab-case for folder naming
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `/images/${normalizedCategory}/${filename}`;
};

/**
 * Validates if an image file has an acceptable format
 */
export const isValidImageFormat = (filename: string): boolean => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const extension = '.' + filename.split('.').pop()?.toLowerCase();
  return validExtensions.includes(extension);
};

/**
 * Gets recommended dimensions for different image categories
 */
export const getRecommendedDimensions = (category: string): { width: number; height: number } => {
  switch (category.toLowerCase()) {
    case 'assistance-dogs':
    case 'breeds':
    case 'outdoor':
      return { width: 800, height: 600 }; // Standard for photos
    case 'services':
      return { width: 600, height: 400 }; // Good for service cards
    default:
      return { width: 800, height: 600 }; // Default size
  }
};

/**
 * Creates a standardized alt text for images
 */
export const generateAltText = (metadata: ImageMetadata): string => {
  const { category, altText, caption } = metadata;
  const categoryWords = category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  if (caption) {
    return `${categoryWords}: ${caption}`;
  }
  
  return `${categoryWords} - ${altText}`;
};

/**
 * Calculates the optimal size for an image to balance quality and performance
 */
export const calculateOptimalSize = (width: number, height: number, maxSize = 1920): { width: number; height: number } => {
  if (width <= maxSize && height <= maxSize) {
    return { width, height };
  }

  const ratio = Math.min(maxSize / width, maxSize / height);
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio)
  };
};

/**
 * Checks if an image meets the recommended size criteria
 */
export const isImageOptimized = (width: number, height: number, maxSize = 1920): boolean => {
  return width <= maxSize && height <= maxSize;
};

/**
 * Generates a responsive image component with multiple sizes
 */
export const generateResponsiveImageProps = (category: string, filename: string) => {
  const basePath = getImagePath(category, filename);
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  const extension = filename.substring(filename.lastIndexOf('.'));

  return {
    src: basePath,
    srcSet: [
      `${getImagePath(category, `${nameWithoutExt}_small${extension}`)} 480w`,
      `${getImagePath(category, `${nameWithoutExt}_medium${extension}`)} 768w`,
      `${getImagePath(category, `${nameWithoutExt}_large${extension}`)} 1200w`,
      basePath + ' 1920w'
    ].join(', '),
    sizes: '(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
  };
};
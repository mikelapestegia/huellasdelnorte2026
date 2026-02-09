import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageResource {
  filename: string;
  description: string;
  alt?: string;
}

interface CategoryImagesProps {
  category: string;
  images: ImageResource[];
  basePath?: string;
}

const CategoryImages = ({ category, images, basePath = '/images' }: CategoryImagesProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Preloading logic removed in favor of next/image handling

  return (
    <div className="image-category">
      <h3>{category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-card">
            {loadedImages[image.filename] !== false ? (
              <div className="image-container">
                <Image
                  src={`${basePath}/${category.replace('_', '-')}/${image.filename}`}
                  alt={image.alt || image.description}
                  fill
                  className="responsive-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => {
                    setLoadedImages(prev => ({
                      ...prev,
                      [image.filename]: false
                    }));
                  }}
                />
              </div>
            ) : (
              <div className="placeholder-image">
                <p>Imagen no disponible</p>
              </div>
            )}
            <p className="image-description">{image.description}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .image-category {
          margin: 2rem 0;
        }
        
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }
        
        .image-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .image-container {
          position: relative;
          width: 100%;
          height: 200px;
        }

        .image-container :global(.responsive-image) {
          object-fit: cover;
        }
        
        .placeholder-image {
          width: 100%;
          padding: 50px 0;
          text-align: center;
          background-color: #f5f5f5;
          border-bottom: 1px solid #eee;
        }
        
        .image-description {
          padding: 0.75rem;
          margin: 0;
          font-size: 0.9rem;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default CategoryImages;
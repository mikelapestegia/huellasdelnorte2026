import { useState, useEffect } from 'react';
import Image from 'next/image';
import catalanBreedsData from '@/data/catalan_breeds.json';

interface BreedInfo {
  id: string;
  name: string;
  origin: string;
  description: string;
  characteristics: string[];
  imageUrl?: string;
}

const CatalanBreedsSection = () => {
  const [breeds, setBreeds] = useState<BreedInfo[]>([]);

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For now, we'll use the static data
    setBreeds(catalanBreedsData.catalan_breeds as BreedInfo[]);
  }, []);

  return (
    <section className="catalan-breeds-section">
      <h2>Razas Autóctonas de Cataluña</h2>
      <p>Descubre las razas de perros originarias de Cataluña, adaptadas a las condiciones climáticas y geográficas de la región.</p>

      <div className="breeds-grid">
        {breeds.map(breed => (
          <div key={breed.id} className="breed-card">
            <div className="breed-header">
              {breed.imageUrl ? (
                <div className="breed-image-container">
                  <Image
                    src={breed.imageUrl}
                    alt={`Imagen de ${breed.name}`}
                    fill
                    className="breed-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="breed-placeholder">Imagen de {breed.name}</div>
              )}
              <h3>{breed.name}</h3>
              <p className="breed-origin">{breed.origin}</p>
            </div>

            <div className="breed-content">
              <p className="breed-description">{breed.description}</p>

              <div className="characteristics">
                <h4>Características:</h4>
                <ul>
                  {breed.characteristics.map((char, idx) => (
                    <li key={idx}>{char}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="breed-info-sources">
        <h3>Fuentes de Información</h3>
        <ul>
          {catalanBreedsData.breed_info_sources?.map((source, idx) => (
            <li key={idx}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .catalan-breeds-section {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .breeds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .breed-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .breed-header {
          background-color: #f8f9fa;
          padding: 1.5rem;
          text-align: center;
        }
        
        .breed-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          margin-bottom: 1rem;
        }
        
        .breed-image-container :global(.breed-image) {
          object-fit: cover;
          border-radius: 4px;
        }
        
        .breed-placeholder {
          width: 100%;
          height: 200px;
          background-color: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          margin-bottom: 1rem;
          color: #6c757d;
        }
        
        .breed-content {
          padding: 1.5rem;
        }
        
        .breed-description {
          color: #555;
          line-height: 1.6;
        }
        
        .characteristics h4 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #333;
        }
        
        .characteristics ul {
          list-style-type: none;
          padding: 0;
        }
        
        .characteristics li {
          padding: 0.25rem 0;
          padding-left: 1.5rem;
          position: relative;
        }
        
        .characteristics li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #007bff;
          font-weight: bold;
        }
        
        .breed-info-sources {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #eee;
        }
        
        .breed-info-sources h3 {
          margin-bottom: 1rem;
          color: #333;
        }
        
        .breed-info-sources ul {
          list-style: none;
          padding: 0;
        }
        
        .breed-info-sources li {
          margin-bottom: 0.5rem;
        }
        
        .breed-info-sources a {
          color: #007bff;
          text-decoration: none;
        }
        
        .breed-info-sources a:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default CatalanBreedsSection;
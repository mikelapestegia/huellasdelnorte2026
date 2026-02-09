import { useState } from 'react';
import Image from 'next/image';

interface BreedInfo {
  id: string;
  name: string;
  origin: string;
  description: string;
  characteristics: string[];
  imageUrl?: string;
}

const NorthernBreedsSection = () => {
  const [breeds] = useState<BreedInfo[]>([
    {
      id: 'cantabrian-water-dog',
      name: 'Perro de Agua Cántabro',
      origin: 'Cantabria, norte peninsular',
      description: 'El Perro de Agua Cántabro es una raza autóctona del norte peninsular, utilizada históricamente como auxiliar de los pescadores.',
      characteristics: [
        'Excelente nadador',
        'Pelaje rizado y resistente al agua',
        'Inteligente y obediente',
        'Muy leal a su familia'
      ],
      imageUrl: '/images/breeds/cantabrian_water_dog.jpg'
    },
    {
      id: 'spanish-mastiff',
      name: 'Mastín Español',
      origin: 'Norte peninsular',
      description: 'Uno de los perros más grandes del mundo, el Mastín Español es originario del norte peninsular y se utilizaba como perro de ganado.',
      characteristics: [
        'Gran tamaño y fuerza',
        'Temperamento tranquilo',
        'Excelente perro de guarda',
        'Muy protector con su familia'
      ],
      imageUrl: '/images/breeds/spanish_mastiff.jpg'
    },
    {
      id: 'pyrenean-mastiff',
      name: 'Mastín del Pirineo',
      origin: 'Región pirenaica (norte peninsular)',
      description: 'El Mastín del Pirineo es una raza ancestral utilizada para proteger rebaños en las montañas del norte peninsular.',
      characteristics: [
        'Muy territorial',
        'Instinto protector desarrollado',
        'Gran resistencia al frío',
        'Independiente pero leal'
      ],
      imageUrl: '/images/breeds/pyrenean_mastiff.jpg'
    }
  ]);

  return (
    <section className="northern-breeds-section">
      <h2>Razas Autóctonas del Norte peninsular</h2>
      <p>Descubre las razas de perros originarias del norte peninsular, adaptadas a las condiciones climáticas y geográficas de la región.</p>

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

      <style jsx>{`
        .northern-breeds-section {
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
      `}</style>
    </section>
  );
};

export default NorthernBreedsSection;

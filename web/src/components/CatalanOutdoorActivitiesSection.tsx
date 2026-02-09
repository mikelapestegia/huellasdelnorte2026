import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OutdoorActivity {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  distance: string;
  difficulty: string;
  imageUrl?: string;
}

const CatalanOutdoorActivitiesSection = () => {
  const [activities, setActivities] = useState<OutdoorActivity[]>([]);

  useEffect(() => {
    // Simulando una carga de datos real
    const mockActivities: OutdoorActivity[] = [
      {
        id: 'parque-guell',
        name: 'Parque Güell',
        type: 'Parque Urbano',
        description: 'Ruta por el famoso parque de Gaudí ideal para perros. Zonas amplias y vistas panorámicas sobre Barcelona.',
        location: 'Barcelona, Cataluña',
        distance: '3-5 km',
        difficulty: 'Fácil',
        imageUrl: '/images/outdoor/hiking_cataluna_park.jpg'
      },
      {
        id: 'carretera-aigues',
        name: 'La Carretera de les Aigües',
        type: 'Senderismo',
        description: 'Más de 10 km de sendero llano con vistas panorámicas sobre la ciudad de Barcelona. Ideal tanto para paseos como para correr con tu perro.',
        location: 'Barcelona, Cataluña',
        distance: '10-12 km',
        difficulty: 'Fácil',
        imageUrl: '/images/outdoor/riverside_hiking_cataluna.jpg'
      },
      {
        id: 'panta-vallvidrera',
        name: 'El Pantà de Vallvidrera',
        type: 'Naturaleza',
        description: 'Ruta por el embalse de Vallvidrera con paisajes naturales y senderos bien señalizados.',
        location: 'Vallvidrera, Barcelona, Cataluña',
        distance: '5-7 km',
        difficulty: 'Fácil',
        imageUrl: '/images/outdoor/lake_hiking_cataluna.jpg'
      },
      {
        id: 'collserola',
        name: 'La Serra de Collserola',
        type: 'Montaña',
        description: 'Red de senderos en el parque natural de Collserola con rutas de diferentes niveles de dificultad.',
        location: 'Barcelona, Cataluña',
        distance: '8-15 km',
        difficulty: 'Moderada',
        imageUrl: '/images/outdoor/mountain_hiking_cataluna.jpg'
      }
    ];

    setActivities(mockActivities);
  }, []);

  return (
    <section className="catalan-outdoor-activities-section">
      <h2>Rutas y Actividades con Perros en Cataluña</h2>
      <p>Descubre las mejores rutas y actividades al aire libre en Cataluña para disfrutar con tu perro.</p>

      <div className="activities-grid">
        {activities.map(activity => (
          <div key={activity.id} className="activity-card">
            <div className="activity-header">
              {activity.imageUrl ? (
                <div className="activity-image-container">
                  <Image
                    src={activity.imageUrl}
                    alt={`Imagen de ${activity.name}`}
                    fill
                    className="activity-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="activity-placeholder">Imagen de {activity.name}</div>
              )}
              <h3>{activity.name}</h3>
              <span className="activity-type">{activity.type}</span>
            </div>

            <div className="activity-content">
              <p className="activity-description">{activity.description}</p>

              <div className="activity-details">
                <div className="detail-item">
                  <strong>Ubicación:</strong>
                  <span>{activity.location}</span>
                </div>

                <div className="detail-item">
                  <strong>Distancia:</strong>
                  <span>{activity.distance}</span>
                </div>

                <div className="detail-item">
                  <strong>Dificultad:</strong>
                  <span>{activity.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .catalan-outdoor-activities-section {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .activity-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .activity-header {
          background-color: #f8f9fa;
          padding: 1.5rem;
          text-align: center;
        }
        
        .activity-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          margin-bottom: 1rem;
        }
        
        .activity-image-container :global(.activity-image) {
          object-fit: cover;
          border-radius: 4px;
        }
        
        .activity-placeholder {
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
        
        .activity-type {
          display: inline-block;
          background-color: #28a745;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        
        .activity-content {
          padding: 1.5rem;
        }
        
        .activity-description {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .activity-details {
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }
        
        .detail-item {
          margin-bottom: 0.75rem;
        }
        
        .detail-item:last-child {
          margin-bottom: 0;
        }
        
        .detail-item strong {
          display: inline-block;
          width: 100px;
          color: #333;
        }
      `}</style>
    </section>
  );
};

export default CatalanOutdoorActivitiesSection;
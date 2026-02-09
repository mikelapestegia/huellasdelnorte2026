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

const BasqueOutdoorActivitiesSection = () => {
  const [activities, setActivities] = useState<OutdoorActivity[]>([]);

  useEffect(() => {
    // Simulando una carga de datos real
    const mockActivities: OutdoorActivity[] = [
      {
        id: 'costa-vasca',
        name: 'Ruta de la Costa Vasca',
        type: 'Senderismo costero',
        description: 'Ruta de senderismo costero de nivel sencillo pero de distancia considerable, ideal para perros con buena resistencia.',
        location: 'Costa Vasca, País Vasco',
        distance: '18-25 km',
        difficulty: 'Moderada',
        imageUrl: '/images/outdoor/coastal_hiking_basque.jpg'
      },
      {
        id: 'urkiola',
        name: 'Parque Natural de Urkiola',
        type: 'Naturaleza',
        description: 'Ruta por el parque natural ideal para perros con paisajes montañosos y senderos bien señalizados.',
        location: 'Urkiola, Bizkaia, País Vasco',
        distance: '10-15 km',
        difficulty: 'Moderada',
        imageUrl: '/images/outdoor/nature_hiking_urkiola.jpg'
      },
      {
        id: 'flysch-zumaia',
        name: 'Ruta del Flysch en Zumaia',
        type: 'Geología y naturaleza',
        description: 'Ruta costera con formaciones geológicas únicas, apta para perros con correa en zonas señaladas.',
        location: 'Zumaia, Gipuzkoa, País Vasco',
        distance: '5-7 km',
        difficulty: 'Fácil',
        imageUrl: '/images/outdoor/geological_route_flys.jpg'
      },
      {
        id: 'bilbao-circular',
        name: 'Ruta Circular por Bilbao',
        type: 'Urbano',
        description: 'Ruta circular que pasa por puntos emblemáticos de Bilbao, con zonas verdes adecuadas para perros.',
        location: 'Bilbao, Bizkaia, País Vasco',
        distance: '3-5 km',
        difficulty: 'Fácil',
        imageUrl: '/images/outdoor/urban_route_bilbao.jpg'
      }
    ];

    setActivities(mockActivities);
  }, []);

  return (
    <section className="basque-outdoor-activities-section">
      <h2>Rutas y Actividades con Perros en el País Vasco</h2>
      <p>Descubre las mejores rutas y actividades al aire libre en el País Vasco para disfrutar con tu perro.</p>

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
        .basque-outdoor-activities-section {
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

export default BasqueOutdoorActivitiesSection;
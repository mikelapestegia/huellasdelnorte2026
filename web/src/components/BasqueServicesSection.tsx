import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ServiceInfo {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
}

const BasqueServicesSection = () => {
  const [services, setServices] = useState<ServiceInfo[]>([]);

  useEffect(() => {
    // Simulando una carga de datos real
    const mockServices: ServiceInfo[] = [
      {
        id: 'gure-albaitaritza',
        name: 'Clínica Veterinaria Gure Albaitaritza',
        type: 'Veterinaria',
        description: 'Clínica veterinaria en Gorliz, País Vasco',
        location: 'Andra Mari, Gorliz, Bizkaia, País Vasco',
        phone: '+34946777156',
        email: 'info@gurealbaitaritza.es',
        imageUrl: '/images/services/veterinaria_paisvasco.jpg'
      },
      {
        id: 'anicura-uribe-kosta',
        name: 'AniCura Uribe Kosta',
        type: 'Veterinaria',
        description: 'Clínica veterinaria en Basauri con certificado "Cat Friendly"',
        location: 'Uribe Kosta, Basauri, Bizkaia, País Vasco',
        phone: '+34944001234',
        email: 'info@anicura.es',
        imageUrl: '/images/services/anicura_uribe_kosta.jpg'
      },
      {
        id: 'pastor-vasco-training',
        name: 'Pastor Vasco - Centro de Adiestramiento',
        type: 'Adiestramiento',
        description: 'Especialistas en razas autóctonas como el Pastor Vasco y adiestramiento tradicional',
        location: 'Carretera de Zumárraga, s/n, 20500 Arrasate, Gipuzkoa, País Vasco',
        phone: '+34945123456',
        email: 'info@pastorvascoentrena.es',
        imageUrl: '/images/services/dog_training_paisvasco.jpg'
      }
    ];

    setServices(mockServices);
  }, []);

  return (
    <section className="basque-services-section">
      <h2>Servicios Caninos en el País Vasco</h2>
      <p>Encuentra los mejores servicios para tu perro en el País Vasco: veterinarios, guarderías, adiestramiento y más.</p>

      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              {service.imageUrl ? (
                <div className="service-image-container">
                  <Image
                    src={service.imageUrl}
                    alt={`Imagen de ${service.name}`}
                    fill
                    className="service-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="service-placeholder">Imagen de {service.name}</div>
              )}
              <h3>{service.name}</h3>
              <span className="service-type">{service.type}</span>
            </div>

            <div className="service-content">
              <p className="service-description">{service.description}</p>

              <div className="service-details">
                <div className="detail-item">
                  <strong>Ubicación:</strong>
                  <span>{service.location}</span>
                </div>

                {service.phone && (
                  <div className="detail-item">
                    <strong>Teléfono:</strong>
                    <a href={`tel:${service.phone}`}>{service.phone}</a>
                  </div>
                )}

                {service.email && (
                  <div className="detail-item">
                    <strong>Email:</strong>
                    <a href={`mailto:${service.email}`}>{service.email}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .basque-services-section {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .service-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .service-header {
          background-color: #f8f9fa;
          padding: 1.5rem;
          text-align: center;
        }
        
        .service-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          margin-bottom: 1rem;
        }
        
        .service-image-container :global(.service-image) {
          object-fit: cover;
          border-radius: 4px;
        }
        
        .service-placeholder {
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
        
        .service-type {
          display: inline-block;
          background-color: #007bff;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        
        .service-content {
          padding: 1.5rem;
        }
        
        .service-description {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .service-details {
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
        
        .detail-item a {
          color: #007bff;
          text-decoration: none;
        }
        
        .detail-item a:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default BasqueServicesSection;
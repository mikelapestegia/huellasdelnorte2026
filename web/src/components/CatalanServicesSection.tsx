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

const CatalanServicesSection = () => {
  const [services, setServices] = useState<ServiceInfo[]>([]);

  useEffect(() => {
    // Simulando una carga de datos real
    const mockServices: ServiceInfo[] = [
      {
        id: 'hvc-hospital',
        name: 'Hospital Veterinari de Catalunya',
        type: 'Veterinaria',
        description: 'Hospital veterinario con 8 centros y 2 hospitales totalmente equipados con urgencias 24 horas',
        location: 'Varios centros en Barcelona, Cataluña',
        phone: '+34935551234',
        email: 'info@hvc.cat',
        imageUrl: '/images/services/veterinaria_cataluna.jpg'
      },
      {
        id: 'hv-montjuic',
        name: 'HV Montjuïc',
        type: 'Veterinaria',
        description: 'Hospital veterinario de referencia en Barcelona con servicios especializados',
        location: 'Carrer de la Creu Coberta, 47, 08004 Barcelona, Cataluña',
        phone: '+34934176600',
        email: 'info@hvmontjuic.com',
        imageUrl: '/images/services/hv_montjuic.jpg'
      },
      {
        id: 'pastor-catalan-training',
        name: 'Pastor Catalán - Centro de Adiestramiento',
        type: 'Adiestramiento',
        description: 'Especialistas en razas autóctonas como el Pastor Catalán y adiestramiento tradicional',
        location: 'Carretera de Ripoll, s/n, 17500 Ripoll, Girona, Cataluña',
        phone: '+34935123456',
        email: 'info@pastorcatalan.es',
        imageUrl: '/images/services/dog_training_cataluna.jpg'
      }
    ];

    setServices(mockServices);
  }, []);

  return (
    <section className="catalan-services-section">
      <h2>Servicios Caninos en Cataluña</h2>
      <p>Encuentra los mejores servicios para tu perro en Cataluña: veterinarios, guarderías, adiestramiento y más.</p>

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
        .catalan-services-section {
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

export default CatalanServicesSection;
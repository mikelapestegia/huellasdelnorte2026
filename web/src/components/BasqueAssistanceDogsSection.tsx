import { useState, useEffect } from 'react';
import Image from 'next/image';
import basqueAssistanceData from '@/data/basque_assistance_programs.json';

interface AssistanceProgram {
  id: string;
  name: string;
  organization: string;
  description: string;
  services: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  imageUrl?: string;
}

const BasqueAssistanceDogsSection = () => {
  const [programs, setPrograms] = useState<AssistanceProgram[]>([]);

  useEffect(() => {
    setPrograms(basqueAssistanceData.basque_assistance_programs as AssistanceProgram[]);
  }, []);

  return (
    <section className="basque-assistance-dogs-section">
      <h2>Perros de Asistencia en el País Vasco</h2>
      <p>Información sobre los programas de perros guía, de asistencia y de rescate disponibles en el País Vasco.</p>

      <div className="programs-grid">
        {programs.map(program => (
          <div key={program.id} className="program-card">
            <div className="program-header">
              {program.imageUrl ? (
                <div className="program-image-container">
                  <Image
                    src={program.imageUrl}
                    alt={`Imagen de ${program.name}`}
                    fill
                    className="program-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="program-placeholder">Imagen de {program.name}</div>
              )}
              <h3>{program.name}</h3>
              <p className="program-org">{program.organization}</p>
            </div>

            <div className="program-content">
              <p className="program-description">{program.description}</p>

              <div className="services">
                <h4>Servicios:</h4>
                <ul>
                  {program.services.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </div>

              <div className="contact-info">
                <h4>Contacto:</h4>
                {program.contact.address && (
                  <div className="contact-item">
                    <strong>Dirección:</strong>
                    <span>{program.contact.address}</span>
                  </div>
                )}
                {program.contact.phone && (
                  <div className="contact-item">
                    <strong>Teléfono:</strong>
                    <a href={`tel:${program.contact.phone}`}>{program.contact.phone}</a>
                  </div>
                )}
                {program.contact.email && (
                  <div className="contact-item">
                    <strong>Email:</strong>
                    <a href={`mailto:${program.contact.email}`}>{program.contact.email}</a>
                  </div>
                )}
                {program.contact.website && (
                  <div className="contact-item">
                    <strong>Web:</strong>
                    <a href={program.contact.website} target="_blank" rel="noopener noreferrer">
                      {program.contact.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="regulatory-framework">
        <h3>Marco Regulatorio</h3>
        <p>Los perros de asistencia en el País Vasco se rigen por:</p>
        <ul>
          <li><strong>Ley 10/2007:</strong> De 29 de junio, sobre Perros de Asistencia en la Comunidad Autónoma del País Vasco</li>
          <li><strong>Decreto 101/2004:</strong> De 1 de julio, sobre tenencia de animales de la especie canina en la Comunidad Autónoma del País Vasco</li>
          <li><strong>Registro:</strong> Diputaciones Forales del País Vasco</li>
        </ul>
        <p>Más información: <a href={basqueAssistanceData.regulatory_framework.information_url} target="_blank" rel="noopener noreferrer">
          {basqueAssistanceData.regulatory_framework.information_url}
        </a></p>
      </div>

      <style jsx>{`
        .basque-assistance-dogs-section {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .program-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .program-header {
          background-color: #f8f9fa;
          padding: 1.5rem;
          text-align: center;
        }
        
        .program-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          margin-bottom: 1rem;
        }

        .program-image-container :global(.program-image) {
          object-fit: cover;
          border-radius: 4px;
        }
        
        .program-placeholder {
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
        
        .program-content {
          padding: 1.5rem;
        }
        
        .program-description {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .services h4, .contact-info h4 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #333;
        }
        
        .services ul, .contact-info ul {
          list-style-type: none;
          padding: 0;
        }
        
        .services li {
          padding: 0.25rem 0;
          padding-left: 1.5rem;
          position: relative;
        }
        
        .services li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #007bff;
          font-weight: bold;
        }
        
        .contact-item {
          margin-bottom: 0.75rem;
        }
        
        .contact-item:last-child {
          margin-bottom: 0;
        }
        
        .contact-item strong {
          display: inline-block;
          width: 100px;
          color: #333;
        }
        
        .contact-item a {
          color: #007bff;
          text-decoration: none;
        }
        
        .contact-item a:hover {
          text-decoration: underline;
        }
        
        .regulatory-framework {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #eee;
        }
        
        .regulatory-framework h3 {
          margin-bottom: 1rem;
          color: #333;
        }
        
        .regulatory-framework ul {
          list-style: none;
          padding: 0;
        }
        
        .regulatory-framework li {
          padding: 0.25rem 0;
          padding-left: 1.5rem;
          position: relative;
        }
        
        .regulatory-framework li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #28a745;
          font-weight: bold;
        }
        
        .regulatory-framework a {
          color: #007bff;
          text-decoration: none;
        }
        
        .regulatory-framework a:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default BasqueAssistanceDogsSection;
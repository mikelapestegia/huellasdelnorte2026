import type { FeatureCollection } from "geojson";

// AUTO-GENERATED from scripts/ingest/sources/transport_operators.json
export const transportServices: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Renfe",
        "region": "Norte (nacional)",
        "type": "train",
        "rules": "Normativa oficial de viaje con mascotas.",
        "policy_url": "https://www.renfe.com/es/es/viajar/informacion-util/mascotas",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -3.7038,
          40.4168
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "ALSA",
        "region": "Norte (nacional)",
        "type": "bus",
        "rules": "Normativa oficial de transporte de animales de compañía.",
        "policy_url": "https://www.alsa.es/tu-viaje/accesibilidad/transporte-mascotas",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -3.7038,
          40.4168
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Metro Bilbao",
        "region": "Bizkaia",
        "type": "metro",
        "rules": "Condiciones generales con apartado específico para perros y gatos.",
        "policy_url": "https://cms.metrobilbao.eus/sites/default/files/2024-03/metro%20condiciones_2024_1.pdf",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.9349,
          43.263
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Bilbobus",
        "region": "Bizkaia (Bilbao)",
        "type": "bus",
        "rules": "Reglamento del servicio público de transporte urbano de viajeros y viajeras por autobús.",
        "policy_url": "https://www.bilbao.eus/cs/Satellite/bilbobus/es/reglamento-bilbobus",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.9349,
          43.263
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Bizkaibus",
        "region": "Bizkaia",
        "type": "bus",
        "rules": "Condiciones para transporte de mascotas en Bizkaibus.",
        "policy_url": "https://www.bizkaia.eus/es/web/bizkaibus/accesibilidad/mascotas",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.9349,
          43.263
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Lurraldebus (MUGI)",
        "region": "Gipuzkoa",
        "type": "bus",
        "rules": "Reglamento con anexos de acceso de animales de compañía.",
        "policy_url": "https://www.mugi.eus/index.php/en/reglamento-y-condiciones-generales",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -1.9812,
          43.323
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Dbus Donostia",
        "region": "Gipuzkoa (Donostia)",
        "type": "bus",
        "rules": "Reglamento de transporte urbano de Donostia-San Sebastián.",
        "policy_url": "https://www.dbus.eus/wp-content/uploads/2020/06/Reglamento-SS-es.pdf",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -1.9812,
          43.323
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Ekialdebus",
        "region": "Gipuzkoa",
        "type": "bus",
        "rules": "Reglamento de transporte del T.H. de Gipuzkoa con artículo de animales.",
        "policy_url": "https://ekialdebus.eus/es/reglamento/",
        "source": "operator",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -1.9812,
          43.323
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Tolosaldeabus",
        "region": "Gipuzkoa",
        "type": "bus",
        "rules": "Reglamento de transporte con anexo de animales de compañía.",
        "policy_url": "https://tolosaldeabus.net/reglamento-de-transporte/",
        "source": "operator",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.0711,
          43.1364
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Euskotren",
        "region": "Euskadi",
        "type": "rail/tram",
        "rules": "Condiciones generales con admisión de animales domésticos.",
        "policy_url": "https://www.euskotren.eus/es/atencion-la-clientela/derechos-y-obligaciones-de-la-persona-viajera",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.676,
          43.2609
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "TUVISA Vitoria-Gasteiz",
        "region": "Álava (Vitoria-Gasteiz)",
        "type": "bus",
        "rules": "Reglamento para la prestación del servicio de transporte urbano colectivo.",
        "policy_url": "https://www.vitoria-gasteiz.org/http/wb021/contenidosEstaticos/adjuntos/es/97/53/29753.pdf",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.6736,
          42.8506
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "EMTUSA Gijón",
        "region": "Asturias (Gijón)",
        "type": "bus",
        "rules": "Web oficial del operador; falta localizar reglamento oficial con condiciones de mascotas (posible BOPA).",
        "policy_url": "https://bus.gijon.es",
        "source": "operator",
        "status": "needs_review"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -5.6615,
          43.5322
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "TUA Oviedo",
        "region": "Asturias (Oviedo)",
        "type": "bus",
        "rules": "Reglamento del Servicio Público de Transporte Urbano (BOPA 02/05/2019).",
        "policy_url": "https://www.tua.es/recursos/doc/alsatua/20140905/avisos/reglamento-servicio-publico-transporte-urbano-oviedo.pdf",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -5.8448,
          43.3619
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "TUS Santander",
        "region": "Cantabria (Santander)",
        "type": "bus",
        "rules": "Ordenanza reguladora del servicio de transporte urbano (BOC 23/01/2023).",
        "policy_url": "https://www.santander.es/system/files/noticias/anexos/2023/02/publicacion_boc_ordenanza_definitiva_23_enero_2023.pdf",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -3.80998,
          43.4623
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Tranvías A Coruña",
        "region": "Galicia (A Coruña)",
        "type": "bus",
        "rules": "Información turística oficial con condiciones para mascotas en bus urbano.",
        "policy_url": "https://www.visitcoruna.com/turismo/es/prepara-tu-viaje/con-mascota/informacion-practica-con-mascotas",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -8.4092,
          43.3709
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "TUC Pamplona (MCP)",
        "region": "Navarra",
        "type": "bus",
        "rules": "Ordenanza municipal que indica las condiciones de transporte de animales en el TUC (transportín y peso máximo).",
        "policy_url": "https://www.pamplona.es/ayuntamiento/varios/ordenanzas-sanidad-no-13-reguladora-de-la-tenencia-de-animales",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -1.6442,
          42.8125
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "TUSSA Santiago",
        "region": "Galicia (Santiago)",
        "type": "bus",
        "rules": "Ordenanza del transporte urbano publicada en BOP A Coruña (2014).",
        "policy_url": "https://tussa.gal/sites/default/files/pagina_basica/Ordenanza%20Tte.Urbano%20Santiago%20BOP%202014-08-04_0.pdf",
        "source": "official",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -8.5448,
          42.8782
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Vitrasa Vigo",
        "region": "Galicia",
        "type": "bus",
        "rules": "Condiciones oficiales para animales según reglamento de Vitrasa.",
        "policy_url": "https://hola-vigo.avanzagrupo.com/hc/es-es/articles/42175194318100--Qu%C3%A9-animales-pueden-viajar-en-el-autob%C3%BAs-y-bajo-qu%C3%A9-condiciones",
        "source": "operator",
        "status": "verified"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -8.7207,
          42.2406
        ]
      }
    }
  ]
};

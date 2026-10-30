import React, { useState } from "react";
import { ArrowRight, MapPin, Navigation, Route } from "lucide-react";

const destinations = [
  {
    name: "Hortifruti",
    label:
      "Siga pelo corredor à esquerda. O setor de hortifruti está à sua frente.",
    path: "M 70 256 L 70 75 L 118 75",
    end: [118, 75],
  },
  {
    name: "Mercearia",
    label:
      "Siga em frente pelo corredor central. O setor de mercearia está à sua direita.",
    path: "M 70 256 L 210 256 L 210 143 L 238 143",
    end: [238, 143],
  },
  {
    name: "Laticínios",
    label:
      "Siga em frente e vire à direita no corredor superior. O setor de laticínios está à sua frente.",
    path: "M 70 256 L 210 256 L 210 53 L 350 53 L 350 90",
    end: [350, 90],
  },
];

export default function ConceptMap() {
  const [selected, setSelected] = useState(0);
  const destination = destinations[selected];
  return (
    <div className="concept-map">
      <div className="map-heading">
        <span className="eyebrow">DA MATEMÁTICA AO COTIDIANO</span>
        <span className="concept-label">Exemplo conceitual</span>
      </div>
      <h3>Um trajeto. Muitas possibilidades.</h3>
      <p className="map-intro">
        Escolha um setor e veja como a orientação espacial pode apoiar o
        percurso.
      </p>
      <div
        className="destination-options"
        role="group"
        aria-label="Escolha um setor do mapa conceitual"
      >
        {destinations.map((item, index) => (
          <button
            key={item.name}
            aria-pressed={index === selected}
            onClick={() => setSelected(index)}
          >
            {item.name}
            {index === selected && <ArrowRight size={14} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 420 300"
        role="img"
        aria-labelledby="map-title map-description"
      >
        <title id="map-title">{`Mapa ilustrativo de um supermercado: trajeto até ${destination.name}`}</title>
        <desc id="map-description">
          Entrada na parte inferior esquerda e três setores. {destination.label}{" "}
          O desenho é esquemático e não possui escala de distância.
        </desc>
        <rect
          x="20"
          y="20"
          width="380"
          height="260"
          rx="16"
          className="map-floor"
        />
        <path
          d="M 70 25 V 274 M 210 25 V 274 M 350 25 V 274 M 25 53 H 396 M 25 256 H 396"
          className="map-corridors"
        />
        <rect
          x="100"
          y="93"
          width="80"
          height="108"
          rx="8"
          className="map-shelf"
        />
        <rect
          x="240"
          y="93"
          width="80"
          height="108"
          rx="8"
          className="map-shelf"
        />
        <path
          d="M 110 121 H 170 M 110 145 H 170 M 110 169 H 170 M 250 121 H 310 M 250 145 H 310 M 250 169 H 310"
          className="shelf-lines"
        />
        <text x="114" y="76" className="map-text">
          Hortifruti
        </text>
        <text x="249" y="222" className="map-text">
          Mercearia
        </text>
        <text x="313" y="76" className="map-text">
          Laticínios
        </text>
        <path d={destination.path} className="map-route" />
        <circle cx="70" cy="256" r="12" className="map-origin" />
        <circle cx="70" cy="256" r="4" fill="white" />
        <circle
          cx={destination.end[0]}
          cy={destination.end[1]}
          r="10"
          className="map-end"
        />
        <circle
          cx={destination.end[0]}
          cy={destination.end[1]}
          r="4"
          fill="white"
        />
        <text x="92" y="262" className="map-text map-entry">
          Entrada
        </text>
      </svg>
      <div className="map-guidance" aria-live="polite" aria-atomic="true">
        <Navigation size={21} aria-hidden="true" />
        <p>
          <strong>Destino: {destination.name}</strong>
          <span>{destination.label}</span>
        </p>
      </div>
      <div className="map-legend">
        <span>
          <MapPin size={14} /> Localização
        </span>
        <span>
          <Route size={14} /> Trajeto e distância
        </span>
        <span>
          <Navigation size={14} /> Direção
        </span>
      </div>
      <p className="map-note">
        Mapa sem escala. As orientações são ilustrativas; não constituem
        navegação real.
      </p>
    </div>
  );
}

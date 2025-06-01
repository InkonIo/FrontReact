import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Иконка для центра полигона
const leafIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/415/415733.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const mockPolygons = [
  {
    id: 1,
    name: "Тестовый полигон",
    area: 150,
    center: [43.5254, 76.9036], // Широта, Долгота (поменял порядок)
    geo_json: {
      type: "Polygon",
      coordinates: [[
        [76.8936, 43.5154],
        [76.9136, 43.5154],
        [76.9136, 43.5354],
        [76.8936, 43.5354],
        [76.8936, 43.5154]
      ]]
    }
  }
];

// Генерация моковых датчиков
function generateMockSensors(center) {
  const [lat, lng] = center;
  return Array.from({ length: 5 }, (_, i) => {
    const offsetLat = (Math.random() - 0.5) * 0.01;
    const offsetLng = (Math.random() - 0.5) * 0.01;
    return {
      id: i,
      lat: lat + offsetLat,
      lng: lng + offsetLng,
      moisture: Math.floor(Math.random() * 100),
    };
  });
}

function getColorByMoisture(value) {
  if (value < 30) return 'red';
  if (value < 60) return 'orange';
  return 'green';
}

export default function Map({ selectedPolygon }) {
  const polygon = selectedPolygon || mockPolygons[0];
  const center = polygon.center; // уже [lat, lng]
  const sensors = generateMockSensors(center);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {polygon.geo_json && (
        <>
          <GeoJSON
            data={polygon.geo_json}
            style={{
              color: 'red',
              weight: 4,
              fillOpacity: 0.3,
            }}
          />

          <Marker position={center} icon={leafIcon}>
            <Popup>
              <div style={{ minWidth: '150px' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{polygon.name || 'Без названия'}</h3>
                <p><strong>Площадь:</strong> {polygon.area || 'N/A'} га</p>
                <p><strong>ID:</strong> {polygon.id}</p>
              </div>
            </Popup>
          </Marker>

          {sensors.map((sensor) => (
            <CircleMarker
              key={`${polygon.id}-sensor-${sensor.id}`}
              center={[sensor.lat, sensor.lng]}
              radius={8}
              color={getColorByMoisture(sensor.moisture)}
              fillOpacity={0.8}
            >
              <Popup>
                <div>
                  <p><strong>Влажность:</strong> {sensor.moisture}%</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </>
      )}
    </MapContainer>
  );
}




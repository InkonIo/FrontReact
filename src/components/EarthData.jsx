// src/components/EarthData.jsx
import React, { useEffect, useState } from 'react';
import './EarthData.css'; // если есть стили

const EarthData = () => {
  const [soilData, setSoilData] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState('');

  useEffect(() => {
    const mockData = {
      humidity: 68,
      t0: 295,
      t10: 289,
    };
    setSoilData(mockData);
  }, []);

  const handleInfoClick = (type) => {
    if (!soilData) return;

    switch (type) {
      case 'humidity':
        setSelectedInfo(` Влажность сейчас составляет ${soilData.humidity}% — отличное время для посадки!`);
        break;
      case 'temp':
        setSelectedInfo(` Температура на глубине 10 см — ${soilData.t10}K, на поверхности — ${soilData.t0}K. Проверьте условия перед посадкой.`);
        break;
      case 'pressure':
        setSelectedInfo(` Давление стабильное, благоприятное для работы в поле.`);
        break;
      case 'wind':
        setSelectedInfo(` Ветер спокойный, не повлияет на обработку растений.`);
        break;
      case 'weather':
        setSelectedInfo(` Сейчас идет дождь  — рекомендуем зайти позже для обновления информации о поливе.`);
        break;
      default:
        setSelectedInfo('');
    }
  };

  return (
    <div className="earth-container">
      <div className="modal-box">
        <h2>Данные о почве</h2>

        <div className="info-buttons">
          <button onClick={() => handleInfoClick('humidity')}> Влажность</button>
          <button onClick={() => handleInfoClick('temp')}> Температура</button>
          <button onClick={() => handleInfoClick('pressure')}> Давление</button>
          <button onClick={() => handleInfoClick('wind')}> Ветер</button>
          <button onClick={() => handleInfoClick('weather')}> Погода</button>
        </div>

        {selectedInfo && (
          <div className="info-output">
            <p>{selectedInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarthData;

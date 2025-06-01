import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import axios from 'axios';
import Map from './components/Map';
import Login from './components/Login';
import EarthData from './components/EarthData';
import RegistrationModal from "./components/RegistrationModal";
import IntroModal from "./components/IntroModal"; 
import NotificationSidebar from './components/NotificationSidebar';
import ProfileHeader from './components/ProfileHeader';
import ChatPage from './components/ChatPage';
import MainPage from './components/MainPage'; // Добавляем импорт MainPage

// Основной компонент с картой и данными
function AgroDashboard() {
  const [polygons, setPolygons] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [mode, setMode] = useState('weather');
  const [weather, setWeather] = useState(null);
  const [soil, setSoil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/polygons')
      .then(res => setPolygons(res.data))
      .catch(() => setError('Ошибка при загрузке полигонов'));
  }, []);

  const fetchData = () => {
    if (!selectedId) return alert('Выберите полигон');
    setLoading(true);
    setError('');
    axios.get(`http://localhost:8080/api/${mode}/${selectedId}`)
      .then(res => {
        if (mode === 'weather') {
          setWeather(res.data);
          setSoil(null);
        } else {
          setSoil(res.data);
          setWeather(null);
        }
      })
      .catch(() => setError('Ошибка при загрузке данных'))
      .finally(() => setLoading(false));
  };

  const kelvinToCelsius = k => (k - 273.15).toFixed(1);

  const selectedPolygon = polygons.find(p => p.id === selectedId);

  return (
    <>
      {/* 🔔 Боковая панель уведомлений */}
      <NotificationSidebar />

      <div
        style={{
          width: '100%',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
        }}
      >
       

        <div style={{ gap: 30 }}>
          <div style={{ flex: '1 1 auto', minWidth: 320 }}>
            {weather && (
              <div
                style={{
                  marginTop: 20,
                  border: '1px solid #ccc',
                  padding: 15,
                  borderRadius: 8,
                }}
              >
                <h2>🌦️ Текущая погода</h2>
                <p>Температура: {weather.main.temp} °C</p>
                <p>Ощущается как: {weather.main.feels_like} °C</p>
                <p>Облачность: {weather.weather[0].description}</p>
                <p>Давление: {weather.main.pressure} гПа</p>
                <p>Влажность: {weather.main.humidity} %</p>
                <p>
                  Ветер: {weather.wind.speed} м/с, направление: {weather.wind.deg}°
                </p>
                <p>Видимость: {weather.visibility / 1000} км</p>
              </div>
            )}

            {soil && (
              <div
                style={{
                  marginTop: 20,
                  border: '1px solid #8b4513',
                  padding: 15,
                  borderRadius: 8,
                  backgroundColor: '#f5f5dc',
                }}
              >
                <h2>🌱 Состояние почвы</h2>
                <p>Температура на глубине 10 см: {kelvinToCelsius(soil.t10)} °C</p>
                <p>Температура поверхности (t0): {kelvinToCelsius(soil.t0)} °C</p>
                <p>Влажность почвы: {soil.humidity} %</p>
              </div>
            )}
          </div>

          <div
            style={{
              width: '100%',
              height: 600,
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 0 12px rgba(0,0,0,0.1)',
            }}
          >
            <Map selectedPolygon={selectedPolygon} />
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [exited, setExited] = useState(false);

  const handleContinue = () => {
    setShowIntro(false);
    setShowRegistration(true);
  };

  const handleExit = () => {
    setExited(true);
    setShowIntro(false);
    setShowRegistration(false);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
  };

  const handleSettingsClick = () => {
    alert('Открыть настройки пользователя');
  };

  if (exited) {
    // Показываем только окно благодарности, больше ничего не показываем
    return <IntroModal exited={true} />;
  }

  if (showIntro) {
    return <IntroModal onContinue={handleContinue} onExit={handleExit} exited={false} />;
  }

  if (showRegistration) {
    return <RegistrationModal onSuccess={handleRegistrationSuccess} />;
  }

  // После успешной регистрации показываем шапку и маршруты
  return (
    <Router>
      <ProfileHeader onSettingsClick={handleSettingsClick} />
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* Заменяем Login на MainPage для главной */}
        <Route path="/login" element={<Login />} /> {/* Перемещаем Login на отдельный путь */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<AgroDashboard />} />
        <Route path="/earthdata" element={<EarthData />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
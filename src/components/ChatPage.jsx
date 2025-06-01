import React, { useState, useEffect, useRef } from 'react';
import ChatMain from './ChatMain'; // предполагаю, что это компонент для отображения сообщений
import './ChatPage.css';

export default function ChatPage() {
  const [polygons, setPolygons] = useState({});
  const [selectedPolygon, setSelectedPolygon] = useState("");
  const [message, setMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);

  const messagesEndRef = useRef(null);

  // Скроллим вниз при добавлении сообщений
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMessages]);

  // Загружаем полигоны один раз при монтировании
  useEffect(() => {
    fetch('http://localhost:8080/api/ai/polygons')
      .then(res => res.json())
      .then(data => setPolygons(data))
      .catch(console.error);
  }, []);

  const handleSendMessage = () => {
    if (!selectedPolygon) {
      alert('Выберите полигон');
      return;
    }
    if (!message.trim()) return;

    // Добавляем сообщение пользователя в чат
    setCurrentMessages(prev => [...prev, { sender: 'user', text: message }]);

    // Отправляем запрос на сервер
    fetch('http://localhost:8080/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ polygonId: selectedPolygon, message }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setCurrentMessages(prev => [...prev, { sender: 'ai', text: data.error }]);
        } else {
          setCurrentMessages(prev => [...prev, { sender: 'ai', text: data.advice }]);
        }
      })
      .catch(() => {
        setCurrentMessages(prev => [...prev, { sender: 'ai', text: 'Ошибка сервера' }]);
      });

    setMessage('');
  };

  return (
    <div className="chat-main" style={{ height: '100vh', backgroundColor: '#f3f4f6', padding: 20, display: 'flex', flexDirection: 'column', maxWidth: 600, margin: 'auto', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Агро-чат с ИИ</h2>

      {/* Выбор полигона */}
      <select
        value={selectedPolygon}
        onChange={e => setSelectedPolygon(e.target.value)}
        style={{
          padding: '8px 12px',
          borderRadius: 4,
          border: '1px solid #ccc',
          marginBottom: 20,
          fontSize: 16,
        }}
      >
        <option value="">-- Выберите полигон --</option>
        {Object.entries(polygons).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      {/* Сам чат (текущие сообщения) */}
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'white', borderRadius: 6, border: '1px solid #ccc', padding: 12 }}>
        {currentMessages.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center', marginTop: 50 }}>
            Начните диалог, выбрав полигон и отправив сообщение
          </p>
        )}
        {currentMessages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 16,
                backgroundColor: msg.sender === 'user' ? '#007bff' : '#e5e5ea',
                color: msg.sender === 'user' ? 'white' : 'black',
                maxWidth: '75%',
                wordWrap: 'break-word',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Ввод сообщения */}
      <textarea
        rows={3}
        placeholder="Введите сообщение..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{
          marginTop: 12,
          padding: 10,
          fontSize: 16,
          borderRadius: 6,
          border: '1px solid #ccc',
          resize: 'none',
          width: '100%',
          boxSizing: 'border-box',
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />

      <button
        onClick={handleSendMessage}
        style={{
          marginTop: 10,
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: 16,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        Отправить
      </button>
    </div>
  );
}

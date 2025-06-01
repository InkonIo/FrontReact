import React, { useState } from 'react';

const NotificationSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
    const sidebarWidth = 250;

  return (
 <>
<>
  {/* 🟢 Зелёная стрелочка */}
  <div
    onClick={toggleSidebar}
    style={{
      position: 'fixed',
      top: '50%',
      right: isOpen ? 300 : 0,
      transform: 'translateY(-50%)',
      zIndex: 1001,
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: '#4CAF50',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      transition: 'right 0.6s ease',
      fontSize: 20,
    }}
    title={isOpen ? 'Скрыть уведомления' : 'Показать уведомления'}
  >
    {isOpen ? '>' : '<'}
  </div>

  {/* 📥 Панель уведомлений */}
  <div
    style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: 300,
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '-2px 0 20px rgba(0,0,0,0.2)',
      padding: 20,
      zIndex: 1000,
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'auto' : 'none',
      transition: 'transform 0.6s ease, opacity 0.6s ease',
      willChange: 'transform, opacity',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <h3
      style={{
        marginTop: 0,
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
      }}
    >
      УВЕДОМЛЕНИЯ
    </h3>

    <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
      {[
        'Погода обновлена',
        'Новое сообщение от AI',
        'Почва сканирована',
      ].map((text, index) => (
        <li
          key={index}
          style={{
            backgroundColor: '#e6f9e6',
            border: '1px solid #8bc34a',
            padding: '12px 16px',
            marginBottom: 12,
            borderRadius: 18,
            maxWidth: '100%',
            color: '#2e7d32',
            fontSize: 14,
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`,
          }}
        >
          {text}
        </li>
      ))}
    </ul>
  </div>
</>
</>
  )}

export default NotificationSidebar;





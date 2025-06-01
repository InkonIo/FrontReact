import React, { useState, useEffect, useRef } from 'react';
import './ChatMain.css';

export default function ChatMain({ messages, onSend }) {
  const [input, setInput] = useState('');
  const [hideIntro, setHideIntro] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0 && !hideIntro) {
      setHideIntro(true);
    }
  }, [messages]);

  useEffect(() => {
    // Плавная прокрутка к последнему сообщению
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="chat-main">
      <div className={`chat-intro ${hideIntro ? 'hide' : ''}`}>
        <h2>ИИ Агропомощник</h2>
        <p>
          Этот чат работает только с агропромышленными вопросами. Спросите всё о почве, уходе, рекомендациях — и ИИ поможет вам.
        </p>
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введите ваш агровопрос..."
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
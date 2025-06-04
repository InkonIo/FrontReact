import React, { useState } from 'react';
import './IntroModal.css';

const IntroModal = ({ onContinue, onExit, exited }) => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  
  return (
    <div className="intro-modal">
      {/* Animated particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Top Navigation */}
      <nav className="intro-nav">
        <div></div>
        
        <div className="nav-links">
          <div className="contacts-dropdown">
            <button 
              className="nav-link contacts-button"
              onMouseEnter={() => setIsContactsOpen(true)}
              onMouseLeave={() => setIsContactsOpen(false)}
            >
              Контакты
            </button>
            <div className={`dropdown-panel ${isContactsOpen ? 'dropdown-open' : ''}`}>
              <div className="dropdown-item">
                <span className="contact-icon">📞</span>
                <span>+7 (778) 678-90-36</span>
              </div>
              <div className="dropdown-item">
                <span className="contact-icon">✉️</span>
                <span>info@farmmedex.kz</span>
              </div>
              <div className="dropdown-item">
                <span className="contact-icon">🌐</span>
                <span>farmmedex.kz</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="intro-content">
        {!exited ? (
          <>
            {/* Hero Text */}
            <div className="hero-section">
              <h1 className="hero-title">
                AGRO
                <span className="hero-title-accent">FARM</span>
              </h1>
              
              <div className="hero-description">
                <p className="description-text">
                  класс
                </p>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="button-container">
              <button onClick={onContinue} className="continue-button">
                Продолжить
              </button>
            </div>
          </>
        ) : (
          <div className="exit-message">
            <p className="exit-text">
              Спасибо за проявленный интерес! Будем ждать вас снова ♡
            </p>
          </div>
        )}
        
        {/* Decorative Elements */}
        <div className="decorative-dot decorative-dot-1"></div>
        <div className="decorative-dot decorative-dot-2"></div>
        <div className="decorative-dot decorative-dot-3"></div>
      </div>
      
      {/* Background Elements */}
      <div className="background-overlay"></div>
      <div className="background-pattern"></div>
      <div className="bottom-gradient"></div>
      <div className="animated-bg">
        <div className="animated-circle animated-circle-1"></div>
        <div className="animated-circle animated-circle-2"></div>
      </div>
    </div>
  );
};

export default IntroModal;


import { useState, useEffect } from "react";
import Map from "./Map";
import './RegistrationModal.css';

export default function RegistrationModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(0);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  // Создание анимированных частиц
  useEffect(() => {
    const particles = [];
    const particleCount = 50;
    const container = document.querySelector('.registration-modal');
    
    if (!container) return;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!agree) return setError("Вы должны согласиться на обработку персональных данных");
    if (password.length < 6) return setError("Пароль должен содержать минимум 6 символов");
    if (password !== confirmPassword) return setError("Пароли не совпадают");

    onSuccess();
    setIsRegistered(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login || !password) return setError("Введите логин и пароль");
    onSuccess();
    setIsRegistered(true);
  };

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    if (recoveryStep === 1) {
      if (recoveryCode.length !== 6) {
        return setError("Введите корректный код (6 символов)");
      }
      setRecoveryStep(2);
    } else if (recoveryStep === 2) {
      if (newPassword.length < 6 || newPassword !== repeatNewPassword) {
        return setError("Пароли должны совпадать и быть не менее 6 символов");
      }
      setIsRecovering(false);
      setRecoveryStep(0);
      setNewPassword("");
      setRepeatNewPassword("");
      alert("Пароль успешно обновлён!");
    }
  };

  const startRecovery = () => {
    setIsRecovering(true);
    setRecoveryStep(1);
    setError("");
    alert("Код восстановления отправлен на почту.");
  };

  if (isRegistered) return <Map />;

  return (
    <div className="registration-modal">
      <div className="modal-overlay"></div>
      
      <div className="registration-wrapper">
        <div className="registration-content">
          {!isRecovering && (
            <div className="auth-tabs">
              <div 
                className={`auth-tab ${!isLoginMode ? 'active' : ''}`}
                onClick={() => {
                  setIsLoginMode(false);
                  setError("");
                }}
              >
                SIGN UP
              </div>
              <div 
                className={`auth-tab ${isLoginMode ? 'active' : ''}`}
                onClick={() => {
                  setIsLoginMode(true);
                  setError("");
                }}
              >
                SIGN IN
              </div>
            </div>
          )}

          {!isLoginMode && !isRecovering && (
            <form className="registration-form" onSubmit={handleRegister}>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={login} 
                  onChange={(e) => setLogin(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="input-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="input-group">
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </div>

              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={agree} 
                  onChange={(e) => setAgree(e.target.checked)} 
                />
                <span className="checkmark"></span>
                I agree to the processing of personal data
              </label>

              {error && <div className="error">{error}</div>}
              <button type="submit" className="submit-btn">SIGN UP</button>
            </form>
          )}

          {isLoginMode && !isRecovering && (
            <form className="registration-form" onSubmit={handleLogin}>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={login} 
                  onChange={(e) => setLogin(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="input-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>

              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Keep me logged in
              </label>

              <div 
                className="forgot-password"
                onClick={startRecovery}
              >
                Forgot password?
              </div>

              {error && <div className="error">{error}</div>}
              <button type="submit" className="submit-btn">LOGIN</button>
            </form>
          )}

          {isRecovering && (
            <form className="registration-form" onSubmit={handleRecoverPassword}>
              <h2 className="recovery-title">Password Recovery</h2>
              
              {recoveryStep === 1 && (
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Code from email" 
                    value={recoveryCode} 
                    onChange={(e) => setRecoveryCode(e.target.value)} 
                    required 
                  />
                </div>
              )}
              
              {recoveryStep === 2 && (
                <>
                  <div className="input-group">
                    <input 
                      type="password" 
                      placeholder="New Password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <input 
                      type="password" 
                      placeholder="Repeat New Password" 
                      value={repeatNewPassword} 
                      onChange={(e) => setRepeatNewPassword(e.target.value)} 
                      required 
                    />
                  </div>
                </>
              )}
              
              {error && <div className="error">{error}</div>}
              <button type="submit" className="submit-btn">CONTINUE</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

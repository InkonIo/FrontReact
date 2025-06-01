import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Переход сработал'); // ← это должно сработать
    if (password === '123456') {
      navigate('/dashboard');
    } else {
      setError('❌ Неверный пароль. Попробуйте снова.');
    }
  };

  return (
    <div>
      <h2>Введите пароль</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button onClick={handleLogin}>Продолжить</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;




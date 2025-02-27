import { useState } from 'react';
import axios from 'axios';
import './Login.css'

function Login({ onLogin, navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
      navigate('home');
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
      <button onClick={() => navigate('register')} className="register-button">¿No tienes cuenta? Regístrate aquí</button>
    </div>
  );
}

export default Login;

import { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register({ onRegister, navigate }) {
  const [formData, setFormData] = useState({
    usuario: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terminos: true,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = () => {
    setFormData({ ...formData, terminos: !formData.terminos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      onRegister(response.data.user);
      navigate('login');
    } catch (err) {
      setError(
        err.response?.data?.errors
          ? JSON.stringify(err.response.data.errors)
          : 'Error en el registro'
      );
    }
  };

  const handleGoBack = () => {
    navigate('login'); // Regresa a la página anterior
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="usuario" placeholder="Usuario" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="password" name="password_confirmation" placeholder="Confirmar Contraseña" onChange={handleChange} required />
        <label>
          <input type="checkbox" name="terminos" checked={formData.terminos} onChange={handleCheckbox} /> Acepto los términos
        </label>
        <button type="submit">Registrarse</button>
      </form>
      <button className="back-button" onClick={handleGoBack}>Volver atrás</button>
    </div>
  );
}

export default Register;

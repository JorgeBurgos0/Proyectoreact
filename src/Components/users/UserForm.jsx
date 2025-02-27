import { useState, useEffect } from 'react';
import axios from 'axios';
import '../users/FormsU.css'

function UserForm({ editId, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (editId) {
      axios.get(`http://localhost:8000/api/users/${editId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Se carga la data actual, sin la contraseña
        setFormData({ name: response.data.name, email: response.data.email, password: '' });
      })
      .catch(() => setError('Error al cargar el usuario'));
    }
  }, [editId, token]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8000/api/users/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Para crear un nuevo usuario usamos el endpoint público de registro
        await axios.post('http://localhost:8000/api/register', formData);
      }
      onBack();
    } catch (err) {
      setError('Error al guardar el usuario');
    }
  };

  return (
    <div className="user-form-container">
      <h3>{editId ? 'Editar Usuario' : 'Alta de Usuario'}</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="user-form">
        <input 
          type="text" 
          name="name" 
          id="user-name"
          placeholder="Nombre" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          id="user-email"
          placeholder="Correo" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        {!editId && (
          <input 
            type="password" 
            name="password" 
            id="user-password"
            placeholder="Contraseña" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        )}
        <button type="submit" className="submit-button">
          {editId ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      <button onClick={onBack} className="back-button">Volver</button>
    </div>
  );
}

export default UserForm;

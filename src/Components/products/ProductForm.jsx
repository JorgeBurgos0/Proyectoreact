import { useState, useEffect } from 'react';
import axios from 'axios';
import '../products/Forms.css'

function ProductForm({ editId, onBack }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (editId) {
      axios.get(`http://localhost:8000/api/productos/${editId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setFormData(response.data);
      })
      .catch(() => setError('Error al cargar el producto'));
    }
  }, [editId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8000/api/productos/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8000/api/productos', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onBack();
    } catch (err) {
      setError('Error al guardar el producto');
    }
  };

  return (
    <div className="product-form-container">
      <h3>{editId ? 'Editar Producto' : 'Alta de Producto'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required /> 
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>
      <button onClick={onBack} className="back-button">Volver</button>
    </div>
  );
}

export default ProductForm;

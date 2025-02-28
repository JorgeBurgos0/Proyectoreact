import { useState, useEffect } from 'react';
import axios from 'axios';
import '../products/Forms.css';

function ProductForm({ editId, onBack }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: null
  });

  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (editId) {
      axios
        .get(`http://localhost:8000/api/productos/${editId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setFormData({ ...response.data, imagen: null }); // No cargar la imagen anterior
        })
        .catch(() => setError('Error al cargar el producto'));
    }
  }, [editId, token]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('descripcion', formData.descripcion);
    data.append('precio', formData.precio);
    data.append('stock', formData.stock);
    if (formData.imagen) {
      data.append('imagen', formData.imagen);
    }

    try {
      if (editId) {
        await axios.post(`http://localhost:8000/api/productos/${editId}?_method=PUT`, data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:8000/api/productos', data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
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
        
        {/* Input para la imagen */}
        <input type="file" name="imagen" accept="image/*" onChange={handleChange} />

        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>
      <button onClick={onBack} className="back-button">Volver</button>
    </div>
  );
}

export default ProductForm;

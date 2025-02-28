import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home({ navigate }) {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/productos?buscar=${busqueda}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(response.data);
    } catch (err) {
      setError('Error al obtener productos');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [busqueda, token]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      localStorage.removeItem('token');
      navigate('login');
    }
  };

  return (
    <div className="home-container">
      <div className="top-bar">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar productos" 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <span>🚪</span> Salir
        </button>
      </div>
      
      <h2>Productos</h2>
      {error && <p className="error-message">{error}</p>}
      
      <ul className="product-list">
        {productos.map((producto) => (
          <li key={producto.id} className="product-item">
            <img src={producto.imagen} alt={producto.nombre} className="product-thumbnail" />
            <span className="product-name">{producto.nombre}</span>
            <span className="product-price">${producto.precio}</span>
            <span className="product-stock">Stock: {producto.stock}</span>
          </li>
        ))}
      </ul>

      
      <div className="nav-buttons">
        <button onClick={() => navigate('usuarios')}>👥 Gestión de Usuarios</button>
        <button onClick={() => navigate('productos')}>📦 Gestión de Productos</button>
      </div>
    </div>
  );
}

export default Home;

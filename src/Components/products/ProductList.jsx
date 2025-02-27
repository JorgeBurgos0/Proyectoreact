import { useState, useEffect } from 'react';
import axios from 'axios';
import '../products/list.css'

function ProductList({ onEdit }) {
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/productos?buscar=${buscar}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(response.data);
    } catch (err) {
      setError('Error al obtener productos');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [buscar]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro de eliminar este producto?')) {
      try {
        await axios.delete(`http://localhost:8000/api/productos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (err) {
        setError('Error al eliminar el producto');
      }
    }
  };

  return (
    <div className="products-list-container">
      <h3>Listado de Productos</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <input 
        type="text" 
        placeholder="Buscar productos" 
        value={buscar} 
        onChange={(e) => setBuscar(e.target.value)} 
        className="product-search"
      />
      
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(p.id)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;

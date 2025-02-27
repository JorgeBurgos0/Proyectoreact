import { useState } from 'react';
import ProductList from './products/ProductList';
import ProductForm from './products/ProductForm';
import './Productos.css';

function Products({ navigate }) {
  const [subScreen, setSubScreen] = useState('listado');
  const [editProductId, setEditProductId] = useState(null);

  const changeScreen = (screen, id = null) => {
    setSubScreen(screen);
    setEditProductId(id);
  };

  return (
    <div className="products-container">
      <h2>Catálogo de Productos</h2>

      <div className="nav-buttons">
        <button onClick={() => changeScreen('listado')}>Listado</button>
        <button onClick={() => changeScreen('alta')}>Alta de Producto</button>
        <button onClick={() => navigate('home')}>Volver al Home</button>
      </div>

      {subScreen === 'listado' && (
        <ProductList onEdit={(id) => changeScreen('editar', id)} />
      )}
      
      {(subScreen === 'alta' || subScreen === 'editar') && (
        <ProductForm 
          editId={editProductId} 
          onBack={() => changeScreen('listado')}
        />
      )}
    </div>
  );
}

export default Products;

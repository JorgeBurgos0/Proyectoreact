import { useState } from 'react';
import UserList from './users/UserList';
import UserForm from './users/UserForm';
import './Users.css'

function Users({ navigate }) {
  const [subScreen, setSubScreen] = useState('listado');
  const [editUserId, setEditUserId] = useState(null);

  const changeScreen = (screen, id = null) => {
    setSubScreen(screen);
    setEditUserId(id);
  };

  return (
    <div className="users-container">
      <h2>Catálogo de Usuarios</h2>
      <div className="nav-buttons">
        <button onClick={() => changeScreen('listado')}>Listado</button>
        <button onClick={() => changeScreen('alta')}>Alta de Usuario</button>
        <button onClick={() => navigate('home')}>Volver al Home</button>
      </div>
      {subScreen === 'listado' && (
        <UserList onEdit={(id) => changeScreen('editar', id)} />
      )}
      {(subScreen === 'alta' || subScreen === 'editar') && (
        <UserForm 
          editId={editUserId} 
          onBack={() => changeScreen('listado')}
        />
      )}
    </div>
  );
}

export default Users;

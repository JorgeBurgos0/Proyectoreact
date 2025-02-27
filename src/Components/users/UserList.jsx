import { useState, useEffect } from 'react';
import axios from 'axios';
import '../users/listU.css'


function UserList({ onEdit }) {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(response.data);
    } catch (err) {
      setError('Error al obtener usuarios');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro de eliminar este usuario?')) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (err) {
        setError('Error al eliminar el usuario');
      }
    }
  };

  return (
    <div className="users-list-container">
      <h3>Listado de Usuarios</h3>
      {error && <p className="error-message">{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(user.id)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

import { useState, useEffect } from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Users from './Components/Users';
import Products from './Components/Products';

function App() {
  const [screen, setScreen] = useState(localStorage.getItem('screen') || 'login');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    localStorage.setItem('screen', screen);
  }, [screen]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setScreen('home'); // Ir a home después de login
  };

  const navigate = (newScreen) => {
    if (!user && newScreen !== 'login' && newScreen !== 'register') {
      setScreen('login'); // Si no hay usuario, forzar login
      return;
    }
    setScreen(newScreen);
  };

  return (
    <div className="App">
      {screen === 'login' && <Login onLogin={handleLogin} navigate={navigate} />}
      {screen === 'register' && <Register onRegister={handleLogin} navigate={navigate} />}
      {screen === 'home' && <Home navigate={navigate} />}
      {screen === 'usuarios' && <Users navigate={navigate} />}
      {screen === 'productos' && <Products navigate={navigate} />}
    </div>
  );
}

export default App;

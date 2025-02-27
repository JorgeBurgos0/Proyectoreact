import { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Users from './Components/Users';
import Products from './Components/Products';

function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('login');
  };

  const navigate = (newScreen) => {
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

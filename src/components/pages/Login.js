import React, { useState } from 'react';
import  styles from './Login.module.css'; 

// Componente de Perfil
const ProfileCard = () => {
  return (
    <div className={styles.profilecard}> 
      <div className={styles.usericon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <div className={styles.profileinfo}>
        <h3>Nome</h3>
        <p>Informações que quiser</p>
      </div>
      <div className={styles.favoriteicon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.34 12 17.77 5.82 21.34 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </div>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'usuario' && password === 'senha') {
      setIsLoggedIn(true);
    } else {
      alert('Nome de usuário ou senha inválidos!');
    }
  };

  return (
    <div className={styles.logincontainer}>
      <h2>{isLoggedIn ? 'Bem-vindo!' : 'Login'}</h2>
      {isLoggedIn ? ( 
        <ProfileCard /> 
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
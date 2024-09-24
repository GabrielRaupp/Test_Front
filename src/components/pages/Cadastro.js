// Cadastro.js
import React, { useState } from 'react';
import styles from './Cadastro.module.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('Senhas não conferem');
      return;
    }

    const userData = { username: email, password: senha, name: `${nome} ${sobrenome}`, email };

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.cadastro}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.campo}>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className={styles.campo}>
          <label>Sobrenome:</label>
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </div>
        <div className={styles.campo}>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.campo}>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className={styles.campo}>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;

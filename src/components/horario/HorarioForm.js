import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './HorarioForm.module.css'; // Importa o CSS como um módulo

const HorarioForm = ({ onSubmitSuccess, horarioData }) => {
  const [name, setName] = useState('');
  const [horarios, setHorarios] = useState(''); // Campo para horários
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Se um horarioData for passado, preenche os campos com os dados do horário existente
  useEffect(() => {
    if (horarioData) {
      setName(horarioData.name);
      setHorarios(horarioData.horarios);
      setCategory(horarioData.category);
    }
  }, [horarioData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !horarios || !category) {
      setErrorMessage('Todos os campos são obrigatórios');
      return;
    }

    try {
      let response;
      if (horarioData) {
        // Atualiza o horário se horarioData estiver presente
        response = await axios.put(`/horarios/${horarioData._id}`, {
          name,
          horarios, // Envia os horários
          category,
        });
      } else {
        // Cadastra um novo horário
        response = await axios.post('/horarios', {
          name,
          horarios, // Envia os horários
          category,
        });
      }

      setName('');
      setHorarios(''); // Limpa o campo de horários
      setCategory('');
      setErrorMessage(''); 
      if (onSubmitSuccess) {
        onSubmitSuccess(response.data); 
      }
    } catch (error) {
      console.error('Erro ao salvar o horário:', error);
      setErrorMessage('Erro ao salvar o horário. Tente novamente.');
    }
  };

  return (
    <div className={styles.form}> {/* Aplica a classe .form */}
      <h2>{horarioData ? 'Editar Horário' : 'Cadastrar Horário'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome"
            required
          />
        </div>
        <div>
          <label htmlFor="horarios">Horários:</label>
          <input
            type="datetime-local" // Campo que aceita datas e horários
            id="horarios"
            value={horarios}
            onChange={(e) => setHorarios(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Categoria:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Prova">Prova</option>
            <option value="Orientação">Orientação</option>
            <option value="Co-Orientação">Co-Orientação</option>
          </select>
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Aplica a classe de erro */}

        <button type="submit">{horarioData ? 'Atualizar Horário' : 'Salvar Horário'}</button> {/* Botão */}
      </form>
    </div>
  );
};

export default HorarioForm;

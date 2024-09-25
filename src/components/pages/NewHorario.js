import { useNavigate } from 'react-router-dom';
import HorarioForm from '../horario/HorarioForm';
import styles from './NewHorario.module.css';

function NewHorario() {
  const navigate = useNavigate();

  const createPost = async (horario) => {
    try {
      const response = await fetch('http://localhost:3000/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(horario),
      });
      if (response.ok) {
        navigate('/horarios', { state: { message: 'Horário criado com sucesso!' } });
      } else {
        const errorData = await response.json();
        console.error('Erro ao criar horário:', errorData.message);
        alert('Erro ao criar horário: ' + errorData.message);
      }
    } catch (error) {
      console.error('Erro ao criar horário:', error);
      alert('Erro ao criar horário: ' + error.message);
    }
  };

  return (
    <div className={styles.newhorario_container}>
      <h1>Criar Horário</h1>
      <p>Crie seu horário para depois adicionar os serviços</p>
      <HorarioForm handleSubmit={createPost} btnText="Criar Horário" />
    </div>
  );
}

export default NewHorario;
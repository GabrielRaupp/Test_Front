import { useNavigate } from 'react-router-dom';
import HorarioForm from '../horario/HorarioForm';
import styles from './NewHorario.module.css';

function NewHorario() {
  const navigate = useNavigate();

  const createPost = async (horario) => {
    horario.cost = 0;
    horario.services = [];

    try {
      await fetch('http://localhost:3000/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(horario),
      });
      navigate('/horarios');
    } catch (error) {
      console.error("Erro ao criar horário:", error);
    }
  };

  return (
    <div className={styles.newhorario_container}>
      <h1>Criar Horário</h1>
      <HorarioForm handleSubmit={createPost} btnText="Criar Horário" />
    </div>
  );
}

export default NewHorario;

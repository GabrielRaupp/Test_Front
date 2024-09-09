import { useNavigate } from 'react-router-dom';
import HorarioForm from '../horario/HorarioForm';
import styles from './NewHorario.module.css';
import { db as firebaseDb } from '../../firebase'; 

function NewHorario() {
  const navigate = useNavigate();

  function createPost(horario) {
    horario.cost = 0;
    horario.services = [];

    fetch('http://localhost:3000/horarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(horario),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate('/horarios', { state: { message: 'Projeto criado com sucesso!' } });
      });
  }

  return (
    <div className={styles.newhorario_container}>
      <h1>Criar Horário</h1>
      <p>Crie seu horário para depois adicionar os serviços</p>
      <HorarioForm handleSubmit={createPost} btnText="Criar Horário" />
    </div>
  );
}

export default NewHorario;

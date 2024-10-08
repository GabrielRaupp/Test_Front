import { useState, useEffect } from 'react';
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import HorarioCard from '../horario/HorarioCard';
import Message from '../layout/Message';
import styles from './Horarios.module.css';

function Horarios() {
  const [horarios, setHorarios] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [horarioMessage, setHorarioMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/horarios');
        const data = await response.json();
        console.log('Horarios recebidos:', data);
        setHorarios(data);
        setRemoveLoading(true);
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
        setRemoveLoading(true);
      }
    };

    fetchData();
  }, []);

  const removeHorario = async (id) => {
    try {
      await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      setHorarios(horarios.filter((horario) => horario._id !== id));
      setHorarioMessage('Horário removido com sucesso!');
    } catch (error) {
      console.error("Erro ao remover horário:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>Meus Horários</h1>
        <LinkButton to="/newhorario" text="Montar horário" customClass={styles.addHorarioButton} />
      </div>
      {horarioMessage && <Message type="success" msg={horarioMessage} />}
      <Container customClass={styles.container}>
        {horarios.length > 0 ? (
          horarios.map((horario) => (
            <HorarioCard
              id={horario._id}
              name={horario.name}
              horario={horario.horarios}  // Modificado para receber o horário
              category={horario.category?.name || 'Sem categoria'}
              key={horario._id || horario.id}
              handleRemove={removeHorario}
              customClass={styles.horarioCard}
            />
          ))
        ) : (
          !removeLoading ? <Loading /> : <p>Não há horários cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Horarios;

// src/components/pages/Horarios.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import HorarioCard from '../horario/HorarioCard';
import Message from '../layout/Message';
import { db } from '../../firebase'; 
import styles from './Horarios.module.css';

function Horarios() {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [horarioMessage, setHorarioMessage] = useState('');

  const location = useLocation();
  const message = location.state?.message || '';

  useEffect(() => {
    const unsubscribe = db.collection('horarios').onSnapshot((snapshot) => {
      const horariosData = [];
      snapshot.forEach((doc) =>
        horariosData.push({ id: doc.id, ...doc.data() })
      );
      setHorarios(horariosData);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar horários:", error);
      setLoading(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  const removeHorario = async (id) => {
    try {
      await db.collection('horarios').doc(id).delete();
      setHorarioMessage('Horário removido com sucesso!');
    } catch (error) {
      console.error("Erro ao remover horário:", error);
    }
  };

  return (
    <div className={styles.horario_container}>
      <div className={styles.title_container}>
        <h1>Meus Horários</h1>
        <LinkButton to="/newhorario" text="Montar horário" />
      </div>
      {message && <Message type="success" msg={message} />}
      {horarioMessage && <Message type="success" msg={horarioMessage} />}
      <Container customClass="start">
        {horarios.length > 0 ? (
          horarios.map((horario) => (
            <HorarioCard
              id={horario.id}
              name={horario.name}
              budget={horario.budget}
              cost={horario.cost}
              category={horario.category.name}
              key={horario.id}
              handleRemove={removeHorario}
            />
          ))
        ) : (
          !loading && <p>Não há horários cadastrados!</p>
        )}
        {loading && <Loading />}
      </Container>
    </div>
  );
}

export default Horarios;

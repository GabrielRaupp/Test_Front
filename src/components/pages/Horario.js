import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Horario.module.css';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import HorarioForm from '../horario/HorarioForm';
import Message from '../layout/Message';
import HorarioCard from '../horario/HorarioCard';

function Horario() {
  const { id } = useParams();
  const [horario, setHorario] = useState({});
  const [showHorarioForm, setShowHorarioForm] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/horarios/${id}`);
        const data = await response.json();
        if (data) {
          setHorario(data);
          setHorarios(data.services || []);
        } else {
          setMessage('Horário não encontrado!');
          setType('error');
        }
      } catch (error) {
        console.error("Erro ao buscar horário:", error);
      }
    };

    fetchData();
  }, [id]);

  const editPost = async (updatedHorario) => {
    if (updatedHorario.budget < updatedHorario.cost) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return;
    }

    try {
      await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHorario),
      });
      setHorario(updatedHorario);
      setShowHorarioForm(false);
      setMessage('Horário atualizado com sucesso!');
      setType('success');
    } catch (error) {
      console.error("Erro ao atualizar horário:", error);
      setMessage('Erro ao atualizar o horário!');
      setType('error');
    }
  };

  return (
    <>
      {horario.name ? (
        <div className={styles.horario_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Horário: {horario.name}</h1>
              <button onClick={() => setShowHorarioForm(!showHorarioForm)}>
                {showHorarioForm ? 'Fechar' : 'Editar horário'}
              </button>
              {!showHorarioForm ? (
                <div className={styles.horario_info}>
                  <p>
                    <span>Categoria:</span> {horario.category?.name || 'Sem categoria'}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${horario.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${horario.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.horario_info}>
                  <HorarioForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    horarioData={horario}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Horario;

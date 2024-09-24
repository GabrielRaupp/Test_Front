import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Horario.module.css';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import HorarioForm from '../horario/HorarioForm';
import Message from '../layout/Message'; // Certifique-se de que Message está sendo importado

function Horario() {
  const { id } = useParams();
  const [horario, setHorario] = useState({});
  const [showHorarioForm, setShowHorarioForm] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/horarios/${id}`);
        const data = await response.json();
        if (data) {
          setHorario(data);
        } else {
          setMessage('Horário não encontrado!');
          setType('error');
        }
      } catch (error) {
        console.error("Erro ao buscar horário:", error);
        setMessage('Erro ao buscar o horário!');
        setType('error');
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
      {message && <Message type={type} msg={message} />}
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
                    <span>Horario:</span> R${horario.budget}
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

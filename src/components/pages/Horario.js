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
      setMessage('Projeto atualizado!');
      setType('success');
    } catch (error) {
      console.error("Erro ao atualizar horário:", error);
    }
  };

  const createHorario = async (newHorario) => {
    const horarioWithId = { ...newHorario, id: uuidv4() };
    const newCost = parseFloat(horario.cost) + parseFloat(newHorario.cost || 0);

    if (newCost > parseFloat(horario.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
      setType('error');
      return;
    }

    try {
      const updatedHorarios = [...horarios, horarioWithId];
      await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: updatedHorarios, cost: newCost }),
      });
      setHorarios(updatedHorarios);
      setHorario({ ...horario, cost: newCost });
      setShowHorarioForm(false);
      setMessage('Serviço adicionado!');
      setType('success');
    } catch (error) {
      console.error("Erro ao adicionar serviço:", error);
    }
  };

  const removeHorario = async (horarioId, cost) => {
    try {
      const updatedHorarios = horarios.filter((horario) => horario.id !== horarioId);
      const newCost = parseFloat(horario.cost) - parseFloat(cost);
      await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: updatedHorarios, cost: newCost }),
      });
      setHorarios(updatedHorarios);
      setHorario({ ...horario, cost: newCost });
      setMessage('Serviço removido com sucesso!');
      setType('success');
    } catch (error) {
      console.error("Erro ao remover serviço:", error);
    }
  };

  const toggleHorarioForm = () => {
    setShowHorarioForm(!showHorarioForm);
  };

  return (
    <>
      {horario.name ? (
        <div className={styles.horario_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {horario.name}</h1>
              <button className={styles.btn} onClick={toggleHorarioForm}>
                {!showHorarioForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showHorarioForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Categoria:</span> {horario.category.name}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${horario.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${horario.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <HorarioForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    horarioData={horario}
                  />
                </div>
              )}
            </div>
            <div className={styles.horario_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleHorarioForm}>
                {!showHorarioForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className={styles.form}>
                {showHorarioForm && (
                  <HorarioForm
                    handleSubmit={createHorario}
                    btnText="Adicionar Serviço"
                    horarioData={horario}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {horarios.length > 0 ? (
                horarios.map((horario) => (
                  <HorarioCard
                    id={horario.id}
                    name={horario.name}
                    cost={horario.cost}
                    description={horario.description}
                    key={horario.id}
                    handleRemove={removeHorario}
                  />
                ))
              ) : (
                <p>Não há serviços cadastrados.</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Horario;

// src/components/pages/Horario.js
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Horario.module.css';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import HorarioForm from '../horario/HorarioForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';
import { db } from '../../firebase'; 

function Horario() {
  const { id } = useParams();
  const [horario, setHorario] = useState({});
  const [showHorarioForm, setShowHorarioForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  useEffect(() => {
    const unsubscribe = db.collection('horarios').doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        setHorario({ id: doc.id, ...doc.data() });
        setServices(doc.data().services || []);
      } else {
        setMessage('Horário não encontrado!');
        setType('error');
      }
    }, (error) => {
      console.error("Erro ao buscar horário:", error);
    });

    return () => unsubscribe();
  }, [id]);

  const editPost = async (updatedHorario) => {
    if (updatedHorario.budget < updatedHorario.cost) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return false;
    }

    try {
      await db.collection('horarios').doc(updatedHorario.id).update(updatedHorario);
      setHorario(updatedHorario);
      setShowHorarioForm(false);
      setMessage('Projeto atualizado!');
      setType('success');
    } catch (error) {
      console.error("Erro ao atualizar horário:", error);
    }
  };

  const createService = async (newService) => {
    const service = { ...newService, id: uuidv4(), horario_id: id };
    const newCost = parseFloat(horario.cost) + parseFloat(service.cost);

    if (newCost > parseFloat(horario.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
      setType('error');
      return false;
    }

    try {
      const updatedServices = [...services, service];
      await db.collection('horarios').doc(id).update({
        services: updatedServices,
        cost: newCost,
      });
      setServices(updatedServices);
      setHorario({ ...horario, cost: newCost });
      setShowServiceForm(false);
      setMessage('Serviço adicionado!');
      setType('success');
    } catch (error) {
      console.error("Erro ao adicionar serviço:", error);
    }
  };

  const removeService = async (serviceId, cost) => {
    try {
      const updatedServices = services.filter((service) => service.id !== serviceId);
      const newCost = parseFloat(horario.cost) - parseFloat(cost);
      await db.collection('horarios').doc(id).update({
        services: updatedServices,
        cost: newCost,
      });
      setServices(updatedServices);
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

  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
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
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className={styles.form}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    horarioData={horario}
                  />
                )}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
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

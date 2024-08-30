import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Horario.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import HorarioForm from '../horario/HorarioForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Horario() {
  let { id } = useParams()
  const [horario, setHorario] = useState({})
  const [showHorarioForm, setShowHorarioForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [services, setServices] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')

  useEffect(() => {
    setTimeout(
      () =>
        fetch(`http://localhost:3000/horarios/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setHorario(data)
            setServices(data.services)
          }),
      0
    )
  }, [id])

  function editPost(horario) {
    if (horario.budget < horario.cost) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }

    fetch(`http://localhost:3000/horarios/${horario.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(horario),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setHorario(data)
        setShowHorarioForm(!showHorarioForm)
        setMessage('Projeto atualizado!')
        setType('success')
      })
  }

  function createService(horario) {
    const lastService = horario.services[horario.services.length - 1]

    lastService.id = uuidv4()
    const lastServiceCost = lastService.cost
    const newCost = parseFloat(horario.cost) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(horario.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
      setType('error')
      horario.services.pop()
      return false
    }

    horario.cost = newCost

    fetch(`http://localhost:3000/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lastService),
    })
      .then((resp) => resp.json())
      .then((serviceData) => {
        setServices([...services, serviceData])
        setShowServiceForm(!showServiceForm)
        setMessage('Serviço adicionado!')
        setType('success')

        // Atualiza o custo total do projeto
        return fetch(`http://localhost:3000/horarios/${horario.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cost: newCost }),
        })
      })
      .then(() => setHorario({ ...horario, cost: newCost }))
  }

  function removeService(serviceId, cost) {
    fetch(`http://localhost:3000/services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        const servicesUpdated = horario.services.filter(
          (service) => service.id !== serviceId
        )

        const horarioUpdated = {
          ...horario,
          services: servicesUpdated,
          cost: parseFloat(horario.cost) - parseFloat(cost),
        }

        setHorario(horarioUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')

        // Atualiza o custo total do projeto
        return fetch(`http://localhost:3000/horarios/${horarioUpdated.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cost: horarioUpdated.cost }),
        })
      })
  }

  function toggleHorarioForm() {
    setShowHorarioForm(!showHorarioForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

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
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Horario

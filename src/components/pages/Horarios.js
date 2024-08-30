import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import HorarioCard from '../horario/HorarioCard'
import Message from '../layout/Message'
import styles from './Horarios.module.css'

function Horarios() {
  const [horarios, setHorarios] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [horarioMessage, setHorarioMessage] = useState('')

  const location = useLocation()
  let message = ''
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(
      () =>
        fetch('http://localhost:3000/horarios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setHorarios(data)
            setRemoveLoading(true)
          }),
      100
    )
  }, [])

  function removeHorario(id) {
    fetch(`http://localhost:3000/horarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setHorarios(horarios.filter((horario) => horario.id !== id))
        setHorarioMessage('Horário removido com sucesso!')
      })
  }

  return (
    <div className={styles.horario_container}>
      <div className={styles.title_container}>
        <h1>Meus Horários</h1>
        <LinkButton to="/newhorario" text="Montar horário" />
      </div>
      {message && <Message type="success" msg={message} />}
      {horarioMessage && <Message type="success" msg={horarioMessage} />}
      <Container customClass="start">
        {horarios.length > 0 &&
          horarios.map((horario) => (
            <HorarioCard
              id={horario.id}
              name={horario.name}
              budget={horario.budget}
              category={horario.category.name}
              key={horario.id}
              handleRemove={removeHorario}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && horarios.length === 0 && (
          <p>Não há horários cadastrados!</p>
        )}
      </Container>
    </div>
  )
}

export default Horarios

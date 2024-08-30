import { Link } from 'react-router-dom'
import styles from './HorarioCard.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function HorarioCard({ id, name, budget, category, handleRemove }) {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
  }

  return (
    <div className={styles.horario_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.horario_card_actions}>
        <Link to={'/horario/' + id}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default HorarioCard
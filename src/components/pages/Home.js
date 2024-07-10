import styles from './Home.module.css'
import savings from '../../img/savings.svg'

import LinkButton from '../layout/LinkButton'

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>IntelAgend</span>
      </h1>
      <p>Monte seu horario aqui no botão abaixo!</p>
      <LinkButton to="/newproject" text="Criar Horario/Lembrete" />
      <img src={savings} alt="Savings" />
    </section>
  )
}

export default Home
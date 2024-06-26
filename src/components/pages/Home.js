import styles from './Home.module.css'
import savings from '../../img/savings.svg'

import LinkButton from '../layout/LinkButton'

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>Costs</span>
      </h1>
      <p>Monte seu projeto aqui no botão abaixo pra eu entrar em contato!</p>
      <LinkButton to="/newproject" text="Criar projeto" />
      <img src={savings} alt="Savings" />
    </section>
  )
}

export default Home
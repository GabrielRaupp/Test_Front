import { Link } from 'react-router-dom'; 
import styles from './SingUp.module.css';

function SingUp() {
  return (
    <section className={styles.div}>
      <h1 className={styles.h1}> </h1>
      <ul className={styles.div}>
        <li>
          <h1 className={styles.conta}>
            <Link to="/login">Já tenho conta</Link> 
          </h1>
        </li>
        <li>
          <h1 className={styles.conta}>
            <Link to="/Cadastro">Não tenho conta</Link> 
          </h1>
        </li>
      </ul>
    </section>
  );
}

export default SingUp;

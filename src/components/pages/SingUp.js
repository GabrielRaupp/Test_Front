import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './SingUp.module.css'



function SingUp() {
  return (
    <section className={styles.div} >
        
      <h1 className={styles.h1} >
      </h1>
      <ul className={styles.div}>
        <h1 className={styles.conta} >
          <Link to="/singup" > Já tenho conta </Link>
        </h1> 
          <h1 className={styles.conta } >
          <Link to="/singup">  Não tenho conta </Link>
            
          </h1>
      </ul>
    </section>
  )
  }
  
  export default SingUp;
import styles from './SingUp.module.css'
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'



function SingUp() {
  return (
    <section className={styles.Contact}>
        
      <h1 className={styles.h1} >
        Bem-vindo as Minhas Redes de contato
      </h1>
      <ul className={styles.social_list}>
        <li>
          <a href='https://www.facebook.com/?locale=pt_BR'>
          <FaFacebook />
          </a>
        </li>
        <li>
          <a href='https://www.instagram.com/gabriel.raupp17/'>
          <FaInstagram />
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/checkpoint/challenge/AgFw1s0up6YjiwAAAZBLshnxQjlnMVOY525QlcnAvM_jECGIVnmyMp8ifWbemZrPEXKhyxLzOVl0U9LahPvlX0wAryJjSA?ut=3rSFr8wbj9eHk1'>
          <FaLinkedin />
          </a>
        </li>
        <li>
          <a href='https://github.com/GabrielRaupp'>
          <FaGithub />
          </a>
        </li>
      </ul>
    </section>
  )
  }
  
  export default SingUp;
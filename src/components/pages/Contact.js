import styles from './Contact.module.css'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'



function Contact() {
  return (
    <section className={styles.Contact}>
      <h1>
        Bem-vindo as <span>Minhas Redes de contato</span>
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
      </ul>
    </section>
  )
  }
  
  export default Contact;
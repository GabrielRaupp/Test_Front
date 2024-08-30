import styles from './Contact.module.css'
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'



function Contact() {
  return (
    <section className={styles.Contact}>
        
      <h1 className={styles.h1} >
          Meu cartão do desenvolvedor
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
  
  export default Contact;
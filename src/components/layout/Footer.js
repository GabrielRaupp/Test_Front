import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
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
      <p className={styles.copy_right}>
        <span>IntelAgend</span> &copy; 2024
      </p>
    </footer>
  )
}

export default Footer
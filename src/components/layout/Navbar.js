import { Link } from "react-router-dom";
import Container from "./Container";

import styles from "./Navbar.module.css";

import logo from "../../img/costs_logo.png";


function Navbar()
 {
  <span>IntelAgend</span>
  return (
    <div className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/projects">Agenda</Link>
          </li>

          <li className={styles.item}>
            <Link to="/contact">Contato</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Sing.up">Minha conta</Link>
          </li>
          
        </ul>
      </Container>
    </div>
  );
}

export default Navbar;
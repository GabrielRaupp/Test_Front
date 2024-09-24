import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Home from './components/pages/Home';
import Horarios from './components/pages/Horarios';
import NewHorario from './components/pages/NewHorario';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Horario from './components/pages/Horario';
import SingUp from './components/pages/SingUp';
import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';



function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newhorario" element={<NewHorario />} />
          <Route path="/horario/:id" element={<Horario />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />


        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
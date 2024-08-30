import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Home from './components/pages/Home'
import Horarios from './components/pages/Horarios'
import NewHorario from './components/pages/NewHorario'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import Horario from './components/pages/Horario'
import SingUp from './components/pages/SingUp'


function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/horarios" component={Horarios} />
          <Route path="/company" component={Company} />
          <Route path="/contact" component={Contact} />
          <Route path="/newhorario" component={NewHorario} />
          <Route path="/horario/:id" component={Horario} />
          <Route path="/singup" component={SingUp} />

        </Switch>
      </Container>
      <Footer />
    </Router>
  )
}

export default App

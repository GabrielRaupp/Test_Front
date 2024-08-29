import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import NewProject from './components/pages/NewProject'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import Project from './components/pages/Project'
import SingUp from './components/pages/SingUp'


function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/company" component={Company} />
          <Route path="/contact" component={Contact} />
          <Route path="/newproject" component={NewProject} />
          <Route path="/project/:id" component={Project} />
          <Route path="/singup" component={SingUp} />

        </Switch>
      </Container>
      <Footer />
    </Router>
  )
}

export default App

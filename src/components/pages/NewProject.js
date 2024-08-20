import { useHistory } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject() {
  const history = useHistory()

  function createPost(project) {
    project.cost = 0
    project.services = []

    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        history.push('/projects', { state: { message: 'Projeto criado com sucesso!' } })
      })
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Horário</h1>
      <p>Crie seu horário para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Horário" />
    </div>
  )
}

export default NewProject

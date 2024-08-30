import { useState, useEffect } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './HorarioForm.module.css'

function HorarioForm({ handleSubmit, btnText, horarioData }) {
  const [horario, setHorario] = useState(horarioData || {})
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
  }, [])

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(horario)
  }

  function handleChange(e) {
    setHorario({ ...horario, [e.target.name]: e.target.value })
  }

  function handleCategory(e) {
    setHorario({
      ...horario,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Lembrete"
        name="name"
        placeholder="Insira aqui"
        handleOnChange={handleChange}
        value={horario.name}
      />
      <Input
        type="text"
        text="Horario do projeto"
        name="budget"
        placeholder="Insira o Horario"
        handleOnChange={handleChange}
        value={horario.budget}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={horario.category ? horario.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default HorarioForm
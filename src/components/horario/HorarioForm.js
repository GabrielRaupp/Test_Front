import { useState, useEffect } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from '../horario/HorarioForm.module.css';

function HorarioForm({ handleSubmit, btnText, horarioData }) {
  const [horario, setHorario] = useState(horarioData || {});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
          throw new Error('Erro ao buscar categorias');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!horario.name || !horario.budget || !horario.category) {
      setError('Todos os campos são obrigatórios!');
      return;
    }
    setError('');
    handleSubmit(horario);
  };

  function handleChange(e) {
    setHorario({ ...horario, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setHorario({
      ...horario,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}
      <Input
        type="text"
        text="Nome do Lembrete"
        name="name"
        placeholder="Insira aqui"
        handleOnChange={handleChange}
        value={horario.name || ''}
      />
      <Input
        type="text"
        text="Horário do projeto"
        name="budget"
        placeholder="Insira o Horário"
        handleOnChange={handleChange}
        value={horario.budget || ''}
      />
      {loading ? (
        <p>Carregando categorias...</p>
      ) : (
        <Select
          name="category_id"
          text="Selecione a categoria"
          options={categories}
          handleOnChange={handleCategory}
          value={horario.category ? horario.category.id : ''}
        />
      )}
      <SubmitButton text={btnText} />
    </form>
  );
}

export default HorarioForm;
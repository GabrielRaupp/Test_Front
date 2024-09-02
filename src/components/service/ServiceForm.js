import React, { useState } from 'react'; // Importa React e useState
import styles from './ServiceFrom.module.css';

function ServiceForm({ handleSubmit, btnText, horarioData }) {
  const [service, setService] = useState({
    name: '',
    cost: '',
    description: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setService({
      ...service,
      [name]: value
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    handleSubmit(service);
    setService({
      name: '',
      cost: '',
      description: ''
    });
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <label>
        Nome:
        <input
          type="text"
          name="name"
          value={service.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Custo:
        <input
          type="number"
          name="cost"
          value={service.cost}
          onChange={handleChange}
        />
      </label>
      <label>
        Descrição:
        <textarea
          name="description"
          value={service.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{btnText}</button>
    </form>
  );
}

export default ServiceForm;

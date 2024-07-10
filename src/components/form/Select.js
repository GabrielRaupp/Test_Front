import styles from './Select.module.css'



const Select = () => {
  // Array de opções
  const options = [
    { id: 1, name: 'Trabalho' },
    { id: 2, name: 'Prova' },
    { id: 3, name: 'Orientação' }
  ];

  return (
    <div className={styles.form_control}>
      <label htmlFor="mySelect">Escolha o Tipo de Trabalho:</label>
      <select id="mySelect">
        {/* Opção padrão */}
        <option value="">Selecione uma opção</option>
        
        {/* Mapeia as opções para elementos <option> */}
        {options.map(option => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;


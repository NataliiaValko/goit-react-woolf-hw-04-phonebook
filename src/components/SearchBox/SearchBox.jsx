import styles from './SearchBox.module.css';

const SearchBox = ({ filter, onChangeFilter }) => {
  const handleChange = ({ target: { value } }) => onChangeFilter(value);

  return (
    <>
      <label className={styles.label}>
        Find contacts by name
        <input
          className={styles.input}
          value={filter}
          onChange={handleChange}
          type="text"
        />
      </label>
    </>
  );
};

export default SearchBox;

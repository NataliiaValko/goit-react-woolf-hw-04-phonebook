import styles from './Contact.module.css';

const Contact = ({ name, number, id, deleteContact }) => {
  const handleDelete = () => {
    deleteContact(id);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.number}>{number}</p>
        </div>
        <button onClick={handleDelete} className={styles.button} type="button">
          Delete
        </button>
      </div>
    </>
  );
};

export default Contact;

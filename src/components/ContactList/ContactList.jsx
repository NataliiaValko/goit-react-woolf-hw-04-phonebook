import Contact from '../Contact/Contact';

import styles from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <>
      <ul className={styles.list}>
        {contacts.map(({ name, number, id }) => (
          <li className={styles.item} key={id}>
            <Contact
              name={name}
              number={number}
              id={id}
              deleteContact={deleteContact}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;

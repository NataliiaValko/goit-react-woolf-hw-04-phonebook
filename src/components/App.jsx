import { useEffect, useState } from 'react';

import './App.css';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';

const LS_KEY_CONTACTS = 'LS_KEY_CONTACTS';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const data = localStorage.getItem(LS_KEY_CONTACTS);
    if (data) return JSON.parse(data);
    return initialContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  const addContact = newContact => {
    const existContacts = contacts.find(({ name }) => name === newContact.name);

    if (existContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = deletedId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== deletedId)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox filter={filter} onChangeFilter={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;

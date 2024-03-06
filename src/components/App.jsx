import { Component } from 'react';

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

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount() {
    const data = localStorage.getItem(LS_KEY_CONTACTS);
    if (data) this.setState({ contacts: JSON.parse(data) });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem(LS_KEY_CONTACTS, JSON.stringify(contacts));
    }
  }

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  addContact = newContact => {
    const { contacts } = this.state;
    const existContacts = contacts.find(({ name }) => name === newContact.name);

    if (existContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  deleteContact = deletedId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== deletedId),
    }));
  };

  render() {
    const { deleteContact, getVisibleContacts, changeFilter, addContact } =
      this;
    const { filter } = this.state;
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
  }
}

export default App;

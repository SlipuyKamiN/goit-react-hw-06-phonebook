import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from 'redux/actions';
import {
  PhonebookWrapper,
  PhonebookTitle,
  PhonebookSubTitle,
} from './App.styled';
import { ContactForm } from 'components/Form/Form';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  //костилі
  let contacts = Object.values(useSelector(state => state));
  contacts = contacts.filter(contact => contact.id);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const isNameAlreadyInContacts = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (isNameAlreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(name, number));
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  const removeContact = idToDelete => {
    dispatch(deleteContact(idToDelete));
  };

  return (
    <PhonebookWrapper>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onSubmit={handleFormSubmit} />
      <PhonebookSubTitle>Contacts</PhonebookSubTitle>
      <Filter filterValue={filter} handleFilterChange={handleFilterChange} />
      <ContactList contacts={filterContacts()} deleteContact={removeContact} />
    </PhonebookWrapper>
  );
};

import {
  PhonebookWrapper,
  PhonebookTitle,
  PhonebookSubTitle,
} from './App.styled';
import { ContactForm } from 'components/Form/Form';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  return (
    <PhonebookWrapper>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm />
      <PhonebookSubTitle>Contacts</PhonebookSubTitle>
      <Filter />
      <ContactList />
    </PhonebookWrapper>
  );
};

import {
  AppForm,
  FormInput,
  FormInputLabel,
  SubmitButton,
  ErrMessage,
} from './Form.styled';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

export const ContactForm = () => {
  const nameID = nanoid();
  const numberID = nanoid();
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(
        "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required(),
    number: yup
      .string()
      .matches(
        '^[+]?[(]?[0-9]{1,4}[)]?[-s.]?[0-9]{1,4}[-s.]?[0-9]{1,6}$',
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
    reset({ name: '', number: '' });
  };

  return (
    <AppForm autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
      <FormInputLabel htmlFor={nameID}>Name</FormInputLabel>
      <FormInput type="text" {...register('name')} id={nameID} />
      {errors.name && <ErrMessage>{errors.name.message}</ErrMessage>}
      <FormInputLabel htmlFor={numberID}>Number</FormInputLabel>
      <FormInput type="text" {...register('number')} id={numberID} />
      {errors.number && <ErrMessage>{errors.number.message}</ErrMessage>}
      <SubmitButton type="submit">Submit</SubmitButton>
    </AppForm>
  );
};

import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/operationsContacts';
import { getContacts } from '../../redux/sliceContacts';
import { getFilter } from '../../redux/sliceFilter';
import { useEffect } from 'react';


export const ContactList = () => {

  const dispatch = useDispatch();
  
  // Redux отримуєм з сервера дані
  const contacts = useSelector(getContacts);

  const onFilter = useSelector(getFilter);

  useEffect(() => {
    dispatch(fetchContacts())
}, [dispatch])

  // Ф-ція видалення
  const onDeleteContact = idContact => {
    dispatch(deleteContact(idContact));
  };

// Фільтр контактів
  const filterContacts = () => {
 
    return contacts.items.filter(contact =>
      contact.name.toLowerCase().includes(onFilter.toLowerCase())
    );
  };


  return (<>
    {contacts.isLoading && <b> Loading... </b>}
    {contacts.error && <b>{contacts.error}</b>}
    <div className={css.list_box}>
      <ul>
        {filterContacts().map(({ id, number, name, phone }) => {
          return (
            <li key={id} className={css.item}>
              <p className={css.contact_name}>
                {name} ---------- {number || phone}
              </p>
              <button
                className={css.btn_delete_contact}
                type="button"
                onClick={() => onDeleteContact(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
};

ContactList.protoType = {
  contact: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      number: PropTypes.number,
    })
  ),

  onDeleteContact: PropTypes.func,
};

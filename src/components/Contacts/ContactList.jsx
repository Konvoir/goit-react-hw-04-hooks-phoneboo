import PropTypes from 'prop-types';
import s from "./ContactList.module.css"

export const ContactList = ({ contacts, onDelete }) => {
    return (
        <ul className={s.list}>
            {contacts.map(({ id, name, number }) => (
                <li className={s.item} key={id}>
                    <span className={s.text}>{name} :</span>
                    <span className={s.text}>{number}</span>
                    <button className={s.button}
                        onClick={() => { onDelete(id) }}
                    > Delete</button>
                </li>
            ))}
        </ul>
    );
};


ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape).isRequired
};
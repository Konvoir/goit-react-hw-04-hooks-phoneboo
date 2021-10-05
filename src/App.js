import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FormInput } from "./components/FormInput/FormInput";
import { Section } from "./components/Section/Section";
import { ContactList } from "./components/Contacts/ContactList";
import { Filter } from "./components/Contacts/Filter";
import s from "./App.module.css";

const App = () => {
  const [contacts, setContacts] = useState([
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const localContacts = window.localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(localContacts);
    if (parsedContacts) { setContacts(parsedContacts) };
  }, []);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts]);

  const  addContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    contacts.find((contact) => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.find((contact) => contact.number === number)
        ? alert(`${number} is  already in contacts`)
        : setContacts ([contact, ...contacts])
    };

    const deleteContact = (id) => {
     setContacts(contacts.filter((contact) => contact.id !== id))
    };
  
    const changeFilter = (e) => {
    setFilter( e.target.value)
   };
    
    const normalizedFilter = filter.toLowerCase();
    const filterContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter))
      .sort((a, b) => a.name.localeCompare(b.name));
  

  return (
    <>
        <Section title={"Phonebook"}>
          <FormInput onSubmit={addContact} />
        </Section>
        
        <Section title={"Contacts"}>
          <div className={s.container}>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList contacts={filterContacts}
              onDelete={deleteContact}
            />
          </div>
        </Section>
    </>
    );

}

export default App;






// import React, { Component } from "react";
// import { v4 as uuidv4 } from 'uuid';
// import { FormInput } from "./components/FormInput/FormInput";
// import { Section } from "./components/Section/Section";
// import { ContactList } from "./components/Contacts/ContactList";
// import { Filter } from "./components/Contacts/Filter";
// import s from "./App.module.css";

// export class App extends Component {
 
//   state = {
//     contacts: [
//       { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const contact = {
//       id: uuidv4(),
//       name,
//       number,
//     };
//     contacts.find((contact) => contact.name === name)
//       ? alert(`${name} is already in contacts`)
//       : contacts.find((contact) => contact.number === number)
//         ? alert(`${number} is  already in contacts`)
//         : this.setState(({ contacts }) => ({
//           contacts: [contact, ...contacts]
//         }));
//   };

//   deleteContact = (id) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(
//         (contact) => contact.id !== id
//       ),
//     }));
//   };

//   changeFilter = (e) => {
//     this.setState({ filter: e.target.value });
//   };
 
//   filterContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(normalizedFilter))
//       .sort((a, b) => a.name.localeCompare(b.name));
//   };

//   componentDidMount() {
//     const localContacts = localStorage.getItem("contacts");
//     const parsedContacts = JSON.parse(localContacts);
//     if (parsedContacts) {
//       this.setState({
//         contacts: parsedContacts,
//       })
//     }
//   }
  
//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem("contacts", JSON.stringify(contacts))      
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const visibilityContacts = this.filterContacts();
//     return (
//     <>
//         <Section title={"Phonebook"}>
//           <FormInput onSubmit={this.addContact} />
//         </Section>
        
//         <Section title={"Contacts"}>
//           <div className={s.container}>
//             <Filter value={filter} onChange={this.changeFilter} />
//             <ContactList contacts={visibilityContacts}
//               onDelete={this.deleteContact}
//             />
//           </div>
//         </Section>
//     </>
//     );
//   }
// }

// export default App;
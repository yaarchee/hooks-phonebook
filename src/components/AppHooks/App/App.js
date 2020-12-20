import React, { useState, useEffect } from "react";
import CreateContactsForm from "../CreateContactsForm/CreateContactsForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import Section from "../Section/Section";
import styles from "./App.module.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const addContacts = (name, phone) => {
    const newContact = {
      name,
      phone,
      id: phone + name,
    };

    setContacts((prevState) => [...prevState, newContact]);

    console.log(contacts, "адд");
  };

  useEffect(() => {
    const localContactsData = JSON.parse(localStorage.getItem("contactsh"));
    localContactsData && setContacts(localContactsData);
  }, []);

  useEffect(() => {
    localStorage.setItem("contactsh", JSON.stringify(contacts));
  }, [contacts]);

  const removeContact = (idx) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== idx)
    );
  };

  const setFilterContact = (filterParam) => {
    setFilter(filterParam);
  };

  const showFilteredContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <div className={styles.wrapSections}>
        <h2>Hooks</h2>
        <Section>
          <h2>Phonebook</h2>
          <CreateContactsForm onAddContacts={addContacts} />
        </Section>

        {contacts.length >= 1 && (
          <Section>
            <h2>Contacts</h2>
            {contacts.length > 1 && <Filter onSetFilter={setFilterContact} />}
            <ContactList
              listData={showFilteredContacts()}
              removeContact={removeContact}
            />
          </Section>
        )}
      </div>
    </>
  );
}

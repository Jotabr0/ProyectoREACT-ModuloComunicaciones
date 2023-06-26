import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const ContactListContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ContactListItem = styled.li`
  width: 100%;
  height: 50px;
  padding: 20px;
  border-bottom: 1px solid white;
  color: white;

  &:hover{
    background-color: white;
    cursor: pointer;
    color: black;
  }
`;

const ContactItem = styled.div`
  width: 100%;
`;

const ContactName = styled.div`
  
  font-size: 20px;
`;

const ContactPhone = styled.div`
  
  font-size: 16px;
`;

const AlphabetHeader = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-top: 20px;
  color: white;
`;



export function ContactList({onContactClick}) {
  const [contacts, setContacts] = useState([]);

  async function listaContactos() {
    try {
      const response = await fetch("http://localhost:3306/usuarios");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  }
  

  useEffect(() => {
    listaContactos();
    // fetch('http://localhost:3306/usuarios')
    // // fetch('https://randomuser.me/api')
    // // fetch('https://randomuser.me/api/?results=15&nat=es')
    // .then(response => response.json())
    // // .then(data => console.log(data))
    // .then(data => setContacts(data))
    //   .catch(error => console.error(error));
  },[]);

  


  //  const handleContactClick = (phone) => {
  //    console.log(phone);
  //  }

  const handleClick = (phone, id, nombre) => {
    onContactClick(phone, id, nombre);
  };

  const sortedContacts = contacts.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));

  const groupedContacts = sortedContacts.reduce((groups, contact) => {
    const firstLetter = contact.nombre.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(contact);
    return groups;
  }, {});


  return (
    <ContactListContainer>
      {Object.keys(groupedContacts).map(letter => (
        <React.Fragment key={letter}>
          <AlphabetHeader>{letter}</AlphabetHeader>
          {groupedContacts[letter].map(contact => (
            <ContactListItem key={contact.id} onClick={() => handleClick(contact.telefono, contact.id, contact.nombre)}>
              <ContactItem>
                <ContactName>
                  {contact.nombre} 
                </ContactName>
                <ContactPhone>
                  {contact.telefono}
                </ContactPhone>
              </ContactItem>
            </ContactListItem>
          ))}
        </React.Fragment>
      ))}
    </ContactListContainer>
  );
}

export default ContactList;

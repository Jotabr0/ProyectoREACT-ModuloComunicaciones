import React, {useEffect, useState} from 'react';
import FilaContacto from './FilaContacto';
import { BsSearch } from "react-icons/bs";
import {SearchContainer,IconoLupa,H1Estilo, StyledScrollbar,StyledList,StyledButton, InputBusqueda, H1LetraContactos } from "./styles"
import { Tabs } from 'antd';

function ordenarContactosPorLetra(contactos) {
  // Creamos un objeto vacío para almacenar los arrays de contactos por letra
  const contactosOrdenados = {};

  // Recorremos el array de contactos
  contactos.forEach(contacto => {
    // Obtenemos la letra inicial del nombre en minúsculas
    const letraInicial = contacto.nombre.charAt(0).toUpperCase();

    // Si la letra inicial no existe como propiedad en el objeto contactosOrdenados,
    // la creamos como un nuevo array vacío
    if (!contactosOrdenados.hasOwnProperty(letraInicial)) {
      contactosOrdenados[letraInicial] = [];
    }

    // Agregamos el contacto al array correspondiente según su letra inicial
    contactosOrdenados[letraInicial].push(contacto);
  });

  // Ordenamos cada array de contactos por orden alfabético
  for (const letra in contactosOrdenados) {
    contactosOrdenados[letra].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
 
  // Devolvemos el objeto con los contactos ordenados por letra
  return contactosOrdenados;
}


const Contactos = ({ usuarios, setNombreModal,setNumeroSeleccionado ,numeroSeleccionado ,sip , session , setSession , ua,setModalOpen,modalOpen, onCall,onChat}) => {

// console.log('Sip de Contactos-->' , sip)
// console.log('numeroSeleccionado de Contactos-->' , numeroSeleccionado)

  //const [usuarios, setUsuarios] = useState([]);
  
 const idsUsuarios = [usuarios.map(usuario => usuario.id)];
 
// useEffect(() => {
//   fetch('http://localhost:3306/usuarios')
//   // fetch('http://localhost:3307/usuarios')
//     .then(response => response.json())
//     .then(data =>{
//       console.log("usuarios", data)
//        setUsuarios(data);
//   })
//   .catch(error => console.error(error));  
//   }, []);

   const contactosporletra = ordenarContactosPorLetra(usuarios);

   const [valorFiltroContacto, setValorFiltroContacto] = useState(""); 


  



  return (
  
    <StyledScrollbar>
<SearchContainer>
      <IconoLupa />{" "}
      <InputBusqueda
        type="text"
        placeholder="Buscar"
        onChange={(e) => setValorFiltroContacto(e.target.value)}
      />
</SearchContainer>
      <StyledList>
        {/* Iteramos sobre las propiedades del objeto contactosOrdenados */}
        {Object.keys(contactosporletra)
          .sort()
          .map((letra) => (
            <li key={letra}>
              { valorFiltroContacto === "" && (<H1LetraContactos>{letra}</H1LetraContactos>)}
              {/* Iteramos sobre los contactos en el array correspondiente a la letra */}
              {contactosporletra[letra]
                .filter((contacto) => {
                  return contacto.nombre.toLowerCase().includes(valorFiltroContacto.toLowerCase()) || 
                  contacto.telefono.toLowerCase().includes(valorFiltroContacto.toLowerCase());
                })
                .map((contacto, index) => (
                  <FilaContacto
                    id = {contacto.id}
                    nombre={contacto.nombre}
                    telefono={contacto.telefono}
                    setNumeroSeleccionado={setNumeroSeleccionado}
                    numeroSeleccionado={numeroSeleccionado} session={session} ua={ua} setSession={setSession}
                    modalOpen={modalOpen} setModalOpen={setModalOpen}
                    onCall={onCall}
                    onChat={onChat}
                  />
                ))}
            </li>
          ))}
      </StyledList>
    </StyledScrollbar>
  );

};

export default Contactos;
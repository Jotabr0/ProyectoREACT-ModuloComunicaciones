import React from 'react';
import { BsFillTelephoneFill,BsFillChatTextFill } from "react-icons/bs";
import { DivfilaContacto,ButtonLlamadaContactos, NombreContacto, FilaContactoBotones } from "./styles"
import ModalLlamada from '../TerminalSIPPage/ModalLlamada.jsx';
import { useState } from 'react';

const FilaContacto = ({id,nombre, telefono, setNumeroSeleccionado , session, setSession, ua,numeroSeleccionado,modalOpen, setModalOpen, onCall,onChat,setNombreModal}) => { 

  const openModal = () => {
    setModalOpen(true);
}; 

const [showNumero, setShowNumero] = useState(false);

  return (    

<DivfilaContacto onMouseOver={() => setShowNumero(true)} onMouseOut={() => setShowNumero(false)}>
  <NombreContacto><span>{nombre}</span> { showNumero && <span>{telefono}</span>}</NombreContacto> 
  <FilaContactoBotones>
  <ButtonLlamadaContactos><BsFillTelephoneFill onClick={()=>onCall(telefono,nombre)}/></ButtonLlamadaContactos>
  <ButtonLlamadaContactos><BsFillChatTextFill onClick={()=>onChat(id,nombre)} /></ButtonLlamadaContactos>      
  </FilaContactoBotones>
</DivfilaContacto>

  );
};
export default FilaContacto; 
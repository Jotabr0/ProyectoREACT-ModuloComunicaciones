import React, {useState}from 'react';
import { BiTag } from "react-icons/bi";
import { BsFillTelephoneFill} from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import  {InputBusqueda,BotonBorrar,DivTextoChat,ButtonModalLlamada,ButtonLlamadaContactos } from "./styles"

import ClienteSIP from '../TerminalSIPPage/ClienteSIP.jsx';


function Chats() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
       <div className="container">
                {/* <h1>Chats</h1> */}
                 <DivTextoChat>
              
              {/*  <div>
      <ButtonLlamadaContactos onClick={openModal}><BsFillTelephoneFill/> </ButtonLlamadaContactos>

      
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>nombre de persona llamada</h3>
            <h2>Estado de llamada...</h2>
            <ButtonModalLlamada onClick={closeModal}><MdCallEnd/></ButtonModalLlamada>
            
          </div>
        </div>
      )}
    </div> */}

            
                </DivTextoChat>
        {/* <InputBusqueda type="text" /><BotonBorrar ><FiDelete/></BotonBorrar> */}
       </div>
  );
}

export default Chats;

import React from 'react';
import { BsFillTelephoneFill,BsFillChatTextFill } from "react-icons/bs";
import { DivfilaGrupo,ButtonLlamadaContactos } from "./styles"
import { Collapse } from 'antd';
import { useState } from 'react';


const FilaGrupo= ({id,nombre,usuarios}) => { 
  // console.log("grupos de usuarios",usuarios)

  const [showPersonas, setShowPersonas] = useState(false);

  return (
<DivfilaGrupo onMouseOver={() => setShowPersonas(true)} onMouseOut={() => setShowPersonas(false)}>
  
      <h4>{nombre} <ButtonLlamadaContactos></ButtonLlamadaContactos> </h4>
      {
        showPersonas && usuarios.map((usuario)=>{
          return <p>{usuario.nombre}</p>
        })
      }

</DivfilaGrupo>
  );
};

export default FilaGrupo; 
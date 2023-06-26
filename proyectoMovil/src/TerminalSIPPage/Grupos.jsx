import React, {useEffect, useState} from 'react';
import FilaGrupo from './FilaGrupo';
import { BsSearch } from "react-icons/bs";
import {IconoLupa, StyledScrollbar,StyledList,StyledButton, InputBusqueda, H1LetraContactos } from "./styles"
import { Tabs } from 'antd';
import Contactos from './Contactos';

function ordenargruposPorLetra(grupos) {
  // Creo un objeto vacío para almacenar los arrays de grupos por letra
  const gruposOrdenados = {};
  
  // Recorro el array de grupos
  Object.keys(grupos).forEach(grupo_id => {
    // Obtengo la letra inicial del nombre en minúsculas
    const letraInicial = grupos[grupo_id].nombre_grupo.charAt(0).toUpperCase();

    // Si la letra inicial no existe como propiedad en el objeto gruposOrdenados,
    // la creo como un nuevo array vacío
    if (!gruposOrdenados.hasOwnProperty(letraInicial)) {
      gruposOrdenados[letraInicial] = [];
    }
    // Agrego el grupo al array correspondiente según su letra inicial
    gruposOrdenados[letraInicial].push(grupos[grupo_id]);
  });
  // Ordeno cada array de grupos por orden alfabético

  for (const letra in gruposOrdenados) {
    gruposOrdenados[letra].sort((a, b) => a.nombre_grupo.localeCompare(b.nombre_grupo));
  }
  // Devolvemos el objeto con los grupos ordenados por letra
  return gruposOrdenados;
}
const Grupos = ({ setNumeroSeleccionado }) => {

  const [grupos, setGrupos] = useState([]);
useEffect(() => {
  fetch('http://localhost:3306/grupos/usuarios')
  // fetch('http://localhost:3307/grupos/usuarios')
    .then(response => response.json())
    .then(data =>{
      setGrupos(data);
      console.log("GrUpOs",data)
      //  Object.values(data)
  })
  .catch(error => console.error(error));
  }, []);

   const gruposporletra = ordenargruposPorLetra(grupos);
   console.log("gruposporletra:",gruposporletra)

   const [valorFiltroGrupo, setValorFiltroGrupo] = useState("");
   
  return (
  
    <StyledScrollbar>
      <IconoLupa />{" "}
      <InputBusqueda
        type="text"
        placeholder="Buscar"
        onChange={(e) => setValorFiltroGrupo(e.target.value)}
      />
      <StyledList>
        {/* Itero sobre las propiedades del objeto gruposOrdenados */}
        {Object.keys(gruposporletra)
          .sort()
          .map((letra) => (
            <li key={letra}>
              { valorFiltroGrupo === "" && (<H1LetraContactos>{letra}</H1LetraContactos>)}
              {/* Itero sobre los grupos en el array correspondiente a la letra */}
              {gruposporletra[letra]
                .filter((grupo) => {
                  return grupo.nombre_grupo.toLowerCase().includes(valorFiltroGrupo.toLowerCase())
                })
                .map((grupo, index) => (
                  <FilaGrupo
                    // key={index}
                    nombre={grupo.nombre_grupo}
                    usuarios={grupo.usuarios}
                    setNumeroSeleccionado={setNumeroSeleccionado}
                    // posicion={index}
                  />
                ))}
            </li>
          ))}
      </StyledList>
    </StyledScrollbar>
  );
};

export default Grupos;

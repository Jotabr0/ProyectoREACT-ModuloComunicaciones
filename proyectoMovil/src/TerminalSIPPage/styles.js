import styled from "styled-components";
import { Tabs,Modal } from 'antd';
import { BsSearch } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { TiGroup } from 'react-icons/ti';

// Generales
export const StyledButton = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #333;
    color: #f4f4f4;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background-color: transparent;
    text-decoration: underline;
    &:hover {
        background-color: #07d3c2b5; 
        color: #ffffff; 
    }
`;
// export const H1Estilo= styled.h1`
// color:white;
// `
export const InputBusqueda = styled.input`
    width: 60%;
    height: 30px;
    font-size: 15px;
    background-color: #19191900;
    color: white;
    border: none; 
    outline: none; 
`;

export const Left = styled.div`
  flex: 3;
`;

export const Middle = styled.div`
  flex: 3;
`;

export const Right = styled.div`
  flex: 6;
`;

export const DivContenedor = styled.div`
display: flex;
height: 100vh;

// flex-direction: row;
background-color: black;
// // color: white;
// padding: 10px;
// box-sizing: border-box;

//  @media screen and (min-width: 492px) (max-width: 768px) {
//     flex-direction: column;
//     height: auto;
//   }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    // flex-direction: row-reverse;
    // background-color: blue;
    // color: yellow;
  }

  @media screen and (min-width: 1025px) and (max-width: 2270px) {
    // color: white;
    // padding: 20px;
  }
`;
// Contenedor
export const StyledTabs = styled(Tabs)`

  .ant-tabs-tab {
    color:#555;
    border-bottom: 1px solid #00CCB8;
    margin-right: 10px;
    &:hover {
      color: white !important;
    }
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #07d3c2b5; !important; 
    font-weight: 500;
 }

 .ant-tabs-ink-bar {
  position: absolute;
  background: #07d3c2b5;;
  pointer-events: none;
}

  .ant-tabs-tab-active, :where(.css-dev-only-do-not-override-1vtf12y).ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: white !important;
    
  }
  :where(.css-dev-only-do-not-override-1vtf12y).ant-tabs .ant-tabs-ink-bar {
    background: white;
  }
  :where(.css-dev-only-do-not-override-1vtf12y).ant-tabs .ant-tabs-tab {
    font-size:20px
  }

  @media screen and (min-width: 492px) and (max-width: 768px) {
    flex-direction: colum;
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    flex-direction: colum;
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    flex-direction: colum;
  }

`;
/* Tnumerico */

export const ContenedorPadre = styled.div`
display: flex;
flex-direction: row;
background-color: black;
color: white;
height: 100vh;
padding: 10px;
box-sizing: border-box
background: red;
`;
export const BotonBorrar = styled(StyledButton)`
font-size: 20px
`;
export const DivTnumerico = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 30px;
justify-content: center;
align-items: center;
height: 100%;
padding: 20px;
`;

export const InputTelefono = styled.input`
background-color: #f0f0f000;
color: white;
padding: 30PX;
width: 45%;
height: 5px; 
border: none; 
outline: none; 
font-size: 14px;
`;
export const BotonNumero = styled(StyledButton)`
font-size: 35px; 
`;
// export const StyledButtonTLF = styled(StyledButton)`
//     background-color: pink;
// `;
export const DivContenedorTnumerico = styled.div`
padding: 5%;
`;
export const BotonCall = styled(StyledButton)`
color: #ffffff;
background-color: #07d3c2b5;
height: 55px;
width: 100%;
&:hover{
    background-color: #ffffff;
    color: #07d3c2b5;
}
`;

/* listaContactos */

export const H1LetraContactos = styled.h1`
align-items: left;
text-align: left;
`;

/* Estilo para la barra de desplazamiento */

// fila contacto
export const StyledList = styled.ul`
padding-left: 0;
  & li {
    color: white;
    padding:7px;
    padding-bottom: 14px;
    width: 100%;  
    list-style-type: none; 
  }&:hover{
    color: red;
  }

  @media screen and (min-width: 467px) and (max-width: 839px) {
    flex-direction: colum;
        height:600px;
  }

  @media screen and (min-width: 840px) and (max-width: 1024px) {
    flex-direction: colum;
    height: 800px;
  }

  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    flex-direction: colum;
    height:900px;
  }
`;

export const DivfilaContacto = styled.div`
display: flex;
width: auto;
border-bottom: 1px solid #00CCB8;
// width:500px;
font-size: 19px;
flex-direction: row;
    align-items: flex-start;
&:hover{
    background-color:#ecf3f347;
     cursor: pointer;
}
`;

export const DivfilaGrupo = styled.div`
display: flex;
width: auto;
border-bottom: 1px solid #00CCB8;
// width:500px;
font-size: 19px;
flex-direction: column;
    align-items: flex-start;
&:hover{
    background-color:#ecf3f347;
     cursor: pointer;
}
`;

export const NombreContacto = styled.div`
display: flex;
width: 100%;
flex-direction: column;
    align-items: flex-start;
`;

export const FilaContactoBotones = styled.div`
display: flex;
`;

export const ButtonLlamadaContactos = styled(StyledButton)`
font-size: 19px;
margin: 10px;
margin-right: 5px;
margin-left:0px;

&:hover{
    background-color:  #07d3c2b5;
}
`;

export const SearchContainer = styled.div`
  /* Estilos del contenedor de búsqueda */
  position: sticky;
  top: 0;
  background-color: black;
  padding: 10px;
`;

export const IconoLupa = styled(BsSearch)`
font-size: 19px;
color:white;
`;

export const IconoGrupos = styled(TiGroup)`
  /* color: white; */
  margin-right: 5px;
  scale: calc(1.5);
`;

/* Estilo para la barra de desplazamiento */
export const StyledScrollbar = styled.div`
height: 90vh; /* Establece la altura máxima de la lista en 500 píxeles */
overflow-y: auto; 
overflow-x: hidden;

scrollbar-width: thin; /* Firefox */
  scrollbar-color: #00CCB8 black; /* Firefox */

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 3px;
  }
  &::-moz-scrollbar {
    width: 6px;
  }
  &::-moz-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
  &::-moz-scrollbar-track {
    background-color: #ddd;
    border-radius: 3px;
  }  
`;

/* Chat */
export const DivTextoChat = styled.div`
width: 100%;
 `;

/*Modal Llamada*/
export const ButtonModalLlamada = styled(StyledButton)`
font-size: 20px;
margin: 10px;
color: white;
background-color: ${props => (props.disabled ? 'gray' : 'red')};
margin-left: auto;
margin: 10px 10px auto;

&:hover {
  background-color: ${props => (props.disabled ? 'gray' : 'white')};
  color: ${props => (props.disabled ? 'white' : 'red')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
}
`; 

export const ModalComponente = styled(Modal)`
.ant-modal-content {
  border-radius: 3px;
  color: white;
  background: linear-gradient(to bottom, #07d3c2, #046a61);
}

.ant-modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ant-modal-footer {
  text-align: center;
}

.ant-modal-close-x {
  display: none;
}
  `
/*ICONOS*/
export const FiUserIcon = styled(FiUser)`
  font-size: 20px;
  margin-top: 5px;
  margin-right: 10px;
  margin-left: 10px; 
  color: whitesmoke;
`;
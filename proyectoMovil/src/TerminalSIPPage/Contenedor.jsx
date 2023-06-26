
import React, { useEffect, useState } from 'react';
import JsSIP from 'jssip';
import { Button, Modal } from 'antd';
import Contactos from '../TerminalSIPPage/Contactos.jsx';
import Grupos from '../TerminalSIPPage/Grupos.jsx';
import Tnumerico from '../TerminalSIPPage/Tnumerico.jsx';
import { DivContenedor, Pestañas, Left, Middle, Right,IconoGrupos } from "./styles"
import { StyledTabs, FiUserIcon } from './styles';
import ModalLlamada from '../TerminalSIPPage/ModalLlamada.jsx';
import ModalError from '../TerminalSIPPage/ModalError.jsx';


import styled from "styled-components";
import ChatContainer from "./ChatContainer";
import UserLogin from "./UserLogin";
import socketio from "../Socket";


const validNumbers = ['*1', '*2','51068'];

function Contenedor() {

  const [numeroSeleccionado, setNumeroSeleccionado] = React.useState("");
  const [session, setSession] = useState(null); // objeto JsSIP.Session
  const [ua, setUA] = useState(null)// objeto JsSIP.UA
  const [status, setStatus] = useState('disconnected'); // estado de la conexión SIP
  const [modalOpen, setModalOpen] = useState(false);

  const [modalErrorOpen, setModalErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let [estadoSession, setEstadoSession] = useState('')
  const [activo, setActivo] = useState(true);
  const [tiempo, setTiempo] = useState(0);
  const [nombreModal, setNombreModal] = useState('');
  const [botonDesactivado, setBotonDesactivado] = useState(false);

  // const [selectedPhone, setSelectedPhone] = useState("");
  const [user, setUser] = useState(null);
  const [receiverChat, setReceiverChat] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
  fetch('http://localhost:3306/usuarios')
  // fetch('http://localhost:3307/usuarios')
    .then(response => response.json())
    .then(data =>{
      console.log("usuarios", data)
       setUsuarios(data);
  })
  .catch(error => console.error(error));  
  }, []);

  useEffect(() => {
    socketio.on("connect", () => {
      const clientId = socketio.id;
      console.log('Usuario: ', user);
      console.log('Mi SocketID:', clientId);
      setSocketId(clientId);
      // socketio.emit("join", clientId, user);
    });
  },);

  useEffect(() => {
    console.log("USUARIO LOGUEADO:", user);
  }, [user])

  var socket = new JsSIP.WebSocketInterface('wss://10.1.1.25:8089/ws');
  useEffect(() => {

    var configuration = {
      sockets: [socket],
      uri: 'sip:59004@10.1.1.25', // la URI del usuario SIP
      password: 'test', // la contraseña del usuario SIP
    };

    const ua = new JsSIP.UA(configuration);

    ua.on('connected', () => {
      setStatus('connected');
    });

    ua.on('disconnected', () => {
      setStatus('disconnected');
    });

    ua.on('newRTCSession', (e) => {
      const session = e.session;

      session.on('connecting', () => {
        console.log('Conectando...');
        setEstadoSession('Conectando...')
      });
      session.on('progress', () => {
        console.log('Llamada en progreso...');
        setEstadoSession('Llamando...')
      });

      session.on('accepted', () => {
        console.log('Llamada aceptada')
        setEstadoSession('Aceptada')
      });

      session.on('ended', () => {
        console.log('Llamada finalizada')
        setEstadoSession('Llamada finalizada')
        setSession(null);
      });

      session.on('failed', (e) => {
        console.log('Llamada fallida:', e.cause);
        setEstadoSession('Llamada fallida')
        setModalOpen(false);
        setModalErrorOpen(true);
        setErrorMessage("LLamada fallida")
        setSession(null);
      });

      setSession(session)
    });

    setUA(ua)
    ua.start()

    return () => {
      ua.stop();
    };
  }, []);

  // console.log("UA -->", ua)

  var options = {
    'mediaConstraints': { 'audio': true, 'video': false }
  };

  const handleCall = (sip) => {

    const session = ua.call(`sip:${sip}@10.1.1.25`, options);
    // console.log("session --->", session)
    // const audios = [];


    if (session.connection) {
      console.log('Connection is valid');

      session.connection.addEventListener('addstream', e => {
        console.log('Add stream');
        const audio = new window.Audio();
        audio.srcObject = e.stream;
        audio.volume = 1;
        audio.play();
        //   audios.push(audio);
      });
      setSession(session);

    } else {
      console.log('Connection is null');
    }
  };

  const handleStop = () => {
    session.terminate();
    setSession(null);
    setActivo(false);
    setBotonDesactivado(true);
    setTiempo(0);
    setTimeout(() => {
      setModalOpen(false);
    }, 1500);
    setNumeroSeleccionado("");
  };

  const onCall = (sip, nombre) => {
    let nombreUsuario = '';
    if (validNumbers.includes(sip)) {
      if (nombre === undefined) {
        nombreUsuario = usuarios.find(usuario => usuario.telefono === sip)?.nombre
      } else {
        nombreUsuario = nombre;
      }
      setTiempo(0);
      setModalOpen(true);
      handleCall(sip);
      setNumeroSeleccionado(sip);
      setActivo(true);
      setNombreModal(nombreUsuario)
      setBotonDesactivado(false);
    } else {
      setModalErrorOpen(true);
      setErrorMessage("Error, esta extensión no se encuentra registrada.")
    }

  }

  const onChat = (id, nombre) => {
    setReceiverChat({ id: id, nombre: nombre });
  }



  return (
    <>
      {user ? (
        <DivContenedor>
          <Left>
            {/* <img src="../../img" alt="ImagenArgos" />********* */}
            <StyledTabs defaultActiveKey="1"
              items={[
                {
                  label: <span><FiUserIcon/><b>Contactos</b></span>,
                  key: '1',
                  children: <Contactos usuarios={usuarios} setNombreModal={setNombreModal} modalOpen={modalOpen} setModalOpen={setModalOpen}
                    onCall={onCall} onChat={onChat} setNumeroSeleccionado={setNumeroSeleccionado} numeroSeleccionado={numeroSeleccionado} session={session} ua={ua} setSession={setSession} />,
                },
                {
                  label: <span><IconoGrupos/><b>Grupos</b></span>, 
                  key: '2',
                  children: <Grupos />,
                },
              ]}
            />
          </Left>


          <ModalLlamada numeroSeleccionado={numeroSeleccionado} sip={numeroSeleccionado} session={session} ua={ua} setSession={setSession}
            modalOpen={modalOpen} setModalOpen={setModalOpen} handleStop={handleStop} Modal={Modal} Button={Button} estadoSession={estadoSession}
            setActivo={setActivo} activo={activo} setTiempo={setTiempo} tiempo={tiempo} nombreModal={nombreModal} botonDesactivado={botonDesactivado} />


          <ModalError message={errorMessage} modalErrorOpen={modalErrorOpen} setModalErrorOpen={setModalErrorOpen}></ModalError>

          <Middle> <Tnumerico numeroSeleccionado={numeroSeleccionado} onCall={onCall} /></Middle>

          <Right> <ChatContainer userLogin={user} receiverCHAT={receiverChat} /> </Right>

        </DivContenedor>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </>
  );
}
// 51068
export default Contenedor;
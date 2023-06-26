import React, { useEffect, useState, useRef } from "react";
import ChatBoxReceiver, { ChatBoxSender } from "./ChatBox";
import InputText from "./InputText";
import styled from 'styled-components';
import socketio from "../Socket";
import ConversationList from "./ConversationList";
import fondochat from "../Media/fondochat.png";

const ChatContainerWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`;

const ChatSidebarWrapper = styled.div`
  position: relative;
  width: 40%;
  background-color: black;
  overflow: auto;

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

const ChatBoxWrapper = styled.div`
  position: relative;
  height: 100%;
  overflow-y: hidden;
  flex: 1;
  background-color: black;
`;
const ChatHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: black;
  color: white;
  padding-left: 15px;
  padding-right: 25px;
  border-bottom: 5px solid #00CCB8;
  height: 60px;
`;

const ChatListWrapper = styled.div`
  position: relative;
  height: calc(100% - 165px);
  overflow: auto;
  background-image: url(${fondochat});
  background-repeat: no-repeat;
  background-position: 0px -200px;
  background-size: 100%;
  padding-left: 10px;
  padding-right: 10px;

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

const ChatInputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: ${(props) => props.receiverEmpty ? 'none' : ''};
`;

export default function ChatContainer({ userLogin, receiverCHAT }) {

  const [chats, setChats] = useState([]);
  const [user, setUser] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [receiver, setReceiver] = useState('');
  const [displayReceiver, setDisplayReceiver] = useState('');
  const [group, setGroup] = useState('');
  const [isGroup, setIsGroup] = useState(false);
  const chatListRef = useRef(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const selectedConversationRef = useRef(null);
  // const [mensajesNoLeidos, setMensajesNoLeidos] = useState({ numero: 0, destino: null });
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState({});
  const [userNames, setUserNames] = useState({});

  function handleConversationSelect(receiverID, receiverNOMBRE, notification, groupID, groupNOMBRE) {
    if (receiverID && receiverNOMBRE && notification) {
      setReceiver({ id: receiverID, nombre: receiverNOMBRE });
      setDisplayReceiver(receiverNOMBRE);
      setSelectedConversation(receiverID);
      selectedConversationRef.current = receiverID;
      setIsGroup(false);
      setGroup(null);

      if (notification) {
        // if (parseInt(receiverID) === parseInt(notification.origen)) {
        console.log("SON IGUALES, PONER A 0")
        // setMensajesNoLeidos({ numero: 0 });
        // }
        console.log("LLEGA NOTIFICACION")
        setMensajesNoLeidos(notification);
      }
    }

    if (groupID && groupNOMBRE) {
      setGroup({ id: groupID, nombre: groupNOMBRE });
      setSelectedConversation(groupID);
      selectedConversationRef.current = groupID;
      setIsGroup(true);
      setDisplayReceiver(groupNOMBRE);
      setReceiver('');
    }


  }

  function receiverNULL(boolean, destino) {
    if (boolean && (selectedConversation === destino || destino === receiver.id)) {
      setReceiver('');
      setDisplayReceiver('CHAT');
      setChats([]);
    }
  }

  useEffect(() => {

    async function fetchUserNames() {
      try {
        const response = await fetch('http://localhost:3306/usuarios');
        const users = await response.json();

        const names = users.reduce((acc, user) => {
          acc[user.id] = user.nombre;
          return acc;
        }, {});

        setUserNames(names);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserNames();
  }, [chats]);

  useEffect(() => {
    if (receiverCHAT) {
      setReceiver({ id: receiverCHAT.id, nombre: receiverCHAT.nombre });
      setDisplayReceiver(receiverCHAT.nombre);
      setGroup(null);
      selectedConversationRef.current = receiverCHAT.id;
    }
  }, [receiverCHAT]);

  useEffect(() => {

    if (userLogin) {
      setUser(userLogin);
      socketio.emit("login", userLogin.id);
    }
  }, [userLogin]);

  useEffect(() => {
    if (user && receiver) {
      chatWithReceiver(receiver.id, user.id);
    }
  }, [user, receiver, mensajesNoLeidos]);

  useEffect(() => {
    if (user && group) {
      chatWithGroup(group.id);
    }
  }, [user, group]);


  useEffect(() => {

    socketio.on("chatGrupo", ({ message, groupID }) => {
      console.log("MENSAJE RECIBIDO EN GRUPO:", message);


      if (parseInt(selectedConversationRef.current) === parseInt(groupID) && isGroup) {
        console.log("SELECCIONADO CORRECTAMENTE QUIEN RECIBE EL MENSAJE");
        console.log("CONVERSACION SELECCIONADA: ",selectedConversationRef.current);
        console.log("GRUPO DESTINO MENSAJE: ",groupID);
        setChats((chats) => [...chats, message]);

      }

    });
    return () => {
      socketio.off("chatGrupo"); // detener la escucha del evento "chat message" al desmontar el componente
    };

  });




  useEffect(() => {

    socketio.on("chat", ({ message, userID }) => {
      // console.log(`Mensaje recibido de ${userID}: ${message.message}`);
      // console.log("El mensaje: ",message);
      // console.log("Conversacion seleecionada: ",selectedConversationRef.current);
      // console.log("Mensaje de: ", message.userid);

      if (parseInt(selectedConversationRef.current) === parseInt(message.userid)) {
        console.log("SELECCIONADO CORRECTAMENTE QUIEN RECIBE EL MENSAJE");
        setChats((chats) => [...chats, message]);
        console.log("Nuevo estado de chats:", chats);
      } else {
        // setMensajesNoLeidos(prevState =>
        // ({
        //   numero: prevState.numero + 1,
        //   destino: message.userid
        // }));
        setMensajesNoLeidos(prevState => {
          const objetoMensajes = prevState[message.userid];
          if (objetoMensajes) {
            return {
              ...prevState,
              [message.userid]: {
                numero: objetoMensajes.numero + 1,
                origen: message.userid
              }
            };
          } else {
            return {
              ...prevState,
              [message.userid]: {
                numero: 1,
                origen: message.userid
              }
            };
          }
        });
      }
    });
    return () => {
      socketio.off("chat"); // detener la escucha del evento "chat message" al desmontar el componente
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(mensajesNoLeidos);
  }, [mensajesNoLeidos]);


  useEffect(() => {
    if (chatListRef && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
    console.log("CHATS ACTUALES:", chats);
  }, [chats]);

  function sendChatToSocket(chat, receiver) {
    console.log("Destino del mensaje desde sendchattosocket: ", receiver, "mensaje: ", chat.message);
    socketio.emit("chat", { message: chat, userID: receiver });
  }
  function addMessage(chat) {
    const userid = user.id;
    const username = user.nombre;
    const newChat = { ...chat, userid, username };

    // sendChatToSocket([...chats, newChat, receiver.id]);
    if (receiver) {
      setChats([...chats, newChat]);
      sendChatToSocket(newChat, receiver.id);
      const nuevoMensaje = {
        sender: user.id,
        receiver: receiver.id,
        message: chat.message,
        grupo_id: null
      };
      console.log(nuevoMensaje);
      agregarMensaje(nuevoMensaje);
    }
    if (group) {
      socketio.emit("chatGrupo", { message: newChat, groupID: group.id });
      const nuevoMensaje = {
        sender: user.id,
        receiver: null,
        message: chat.message,
        grupo_id: group.id
      };
      console.log(nuevoMensaje);
      agregarMensaje(nuevoMensaje);
    }

  }

  function agregarMensaje(mensaje) {
    fetch("http://localhost:3306/mensaje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mensaje)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al agregar el mensaje");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function chatWithReceiver(receiverID, senderID) {
    fetch(`http://localhost:3306/mensajes/${receiverID}/${senderID}`)
      .then((response) => response.json())
      .then((data) => {

        console.log(data);
        setChats(data);
      })
      .catch((error) => console.error(error));
  }

  function chatWithGroup(groupID) {
    fetch(`http://localhost:3306/mensajes/${groupID}`)
      .then((response) => response.json())
      .then((data) => {

        console.log("MENSAJES GRUPO:", data);
        setChats(data);
      })
      .catch((error) => console.error(error));
  }


  // function logout() {
  //   localStorage.removeItem("user");
  //   setUser("");
  // }
  function ChatsList() {
    return chats.map((chat, index) => {

      const messageDate = chat.date ? new Date(chat.date) : new Date();
      const currentDate = new Date();
      
      const formattedTime = messageDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const formattedDate = messageDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
      
      const fecha = (messageDate.getDate() === currentDate.getDate()) ? formattedTime : `${formattedTime} ${formattedDate}`;

      // eslint-disable-next-line eqeqeq
      if (chat.sender == user.id || chat.user === user.id || chat.user === user || chat.userid === user.id)
        return (
          <ChatBoxSender
            key={index}
            message={chat.message}
            user={user.nombre}
            fecha={fecha}
          />
        );
      return (
        <ChatBoxReceiver
          key={index}
          message={chat.message}
          fecha={fecha}
          user={chat.userid ? chat.username : (receiver ? receiver.nombre : userNames[chat.sender])}
        /> //chat.sender // chat.userid ? chat.username : chat.sender
      );
    });
  }

  return (
    <ChatContainerWrapper>
      <ChatSidebarWrapper>
        <ConversationList noLeidos={mensajesNoLeidos} chats={chats} onConversationSelect={handleConversationSelect} user={user.id} vaciarReceiver={receiverNULL} receiver={receiver} />
      </ChatSidebarWrapper>
      {/* {user ? ( */}
      <ChatBoxWrapper>
        <ChatHeader>
          <h4 style={{ color: "#00CCB8", textTransform: "uppercase" }}>
            {displayReceiver ? displayReceiver : 'CHAT'}
          </h4>
          <p>{user.nombre}</p>
        </ChatHeader>
        <ChatListWrapper ref={chatListRef}>
          <ChatsList />
        </ChatListWrapper>
        <ChatInputWrapper receiverEmpty={!receiver && !group}>
          <InputText addMessage={addMessage} />
        </ChatInputWrapper>
      </ChatBoxWrapper>
      {/* // ) : (
      //   <UserLogin setUser={setUser} />
      // )} */}
    </ChatContainerWrapper>
  );
}
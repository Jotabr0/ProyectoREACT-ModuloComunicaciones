import React, { useState,useEffect } from "react";
import styled from "styled-components";
// import ContactList from "./ContactList";
// import Phone from "./Phone";
import ChatContainer from "./ChatContainer";
import UserLogin from "./UserLogin";
import socketio from "../Socket";

const Container = styled.div`

  display: flex;
  height: 100vh;
`;

const Left = styled.div`
  flex: 2;
`;

const Middle = styled.div`
  flex: 3;
`;

const Right = styled.div`
  flex: 5;
`;

export function VistaGeneral() {
  const [selectedPhone, setSelectedPhone] = useState("");
  const [user , setUser] = useState(null);
  const [receiverChat, setReceiverChat] = useState(null);
  const [socketId, setSocketId] = useState(null);

  const handleContactClick = (phone, id, nombre) => {
    setSelectedPhone(phone);
    setReceiverChat({ id: id, nombre: nombre });
  };

  useEffect(() => {
    socketio.on("connect", () => {
      const clientId = socketio.id;
      console.log('Usuario: ',user);
      console.log('Mi SocketID:', clientId);
      setSocketId(clientId);
      // socketio.emit("join", clientId, user);
    });
  }, );

  useEffect(() => {
    console.log("USUARIO LOGUEADO:",user);
  }, [user])
  

  

  return (
    <>

      {user ? (
        <Container>
          <Left>
            <ContactList onContactClick={handleContactClick} />
          </Left>
          <Middle>
            <Phone numero={selectedPhone} />
          </Middle>
          <Right>
            <ChatContainer userLogin={user} receiverCHAT ={receiverChat}/>
          </Right>
        </Container>
      ) : (
        <UserLogin setUser={setUser} />
      )}

    </>
  );
}

export default VistaGeneral;

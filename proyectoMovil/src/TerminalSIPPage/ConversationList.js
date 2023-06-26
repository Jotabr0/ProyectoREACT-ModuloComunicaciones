import { useEffect, useRef, useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TiGroup } from 'react-icons/ti';



const ConversationListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  color: white;
`;

const Date = styled.span`
  font-size: 14px;
  color: #757575;

`;

const WhiteTiGroup = styled(TiGroup)`
  /* color: white; */
  margin-right: 5px;
  scale: calc(1.5);
`;


const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConversationInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
`;

const UserName = styled.span`
  margin-bottom: 4px;
  font-weight: bold;
`;



const DeleteButtonWrapper = styled.div`
  margin-left: 8px;
  display: inline-flex;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
  color: #757575;
  margin-left: 8px;
  cursor: pointer;
  display: none;

  &:hover {
    color: white;
    transform: scale(1.2);
  }
`;

const Notification = styled.div`
  background-color: transparent;
  color: #00CCB8;
  font-weight: bolder;
  border-radius: 50%;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const ConversationListItem = styled.li`
  width: 80%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #00CCB8;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #00CCB8;
    cursor: pointer;

    ${Date} {
      color: black;
    }
    ${Notification}{
        color:black;
    }
    ${DeleteButton} {
      display: block;
    }
  }
`;

function ConversationList({ noLeidos, chats, onConversationSelect, user, vaciarReceiver, receiver }) {

    const [userID, setUserID] = useState(user);
    const [myChat, setMyChat] = useState(chats);
    const [userNames, setUserNames] = useState({});
    const [conversationsState, setConversationsState] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [receiverID, setReceiverID] = useState(null);
    const [notifications, setNotifications] = useState(noLeidos);
    const [groups, setGroups] = useState([]);
    const [groupID, setGroupID] = useState(null);

    useEffect(() => {
        if (noLeidos) {
            setNotifications(noLeidos);
            console.log("DESDE DESTINO:", notifications);
        }
    }, [noLeidos]);


    useEffect(() => {
        if (chats) {
            setMyChat(chats)
        }
    }, [chats]);

    useEffect(() => {
        if (user) {
            setUserID(user)
        }
    }, [user]);

    useEffect(() => {
        if (receiver) {
            setReceiverID(receiver.id)
        }
    }, [receiver]);


    useEffect(() => {
        async function fetchConversations() {
            try {
                // if (user) { // Verifica que user esté definido antes de hacer la llamada
                const response = await axios.get(`http://localhost:3306/conversaciones/${userID}`);
                setConversationsState(response.data);
                // console.log("CONVERSACIONES:", response.data);
                // console.log("USUARIO:", userID);
                // console.log("RECEIVER:", receiverID);
                // }
            } catch (error) {
                console.log(error);
            }
        }

        fetchConversations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID, myChat]);


    useEffect(() => {
        async function fetchGroups() {
            try {
                const response = await axios.get(`http://localhost:3306/usuario/${userID}/gruposchat`);
                const groupsData = response.data;
                // console.log("GRUPOS:", groupsData);

                // Obtener los usuarios de cada grupo
                const groupsWithUsersPromises = groupsData.map(async (group) => {
                    const usersResponse = await axios.get(`http://localhost:3306/grupoChat/${group.id}/usuarios`);
                    const usersData = usersResponse.data;
                    return {
                        ...group,
                        users: usersData,
                    };
                });

                // Esperar a que se completen todas las llamadas y obtener los grupos con usuarios
                const groupsWithUsers = await Promise.all(groupsWithUsersPromises);

                setGroups(groupsWithUsers);
            } catch (error) {
                console.log(error);
            }
        }

        fetchGroups();

        console.log("GRUPOS: ", groups);
    }, [userID, myChat]);






    // useEffect(() => {
    //     // console.log("PROBANDO USERID: ", userID);
    //     async function fetchGroups() {
    //         try {
    //             // if (user) { // Verifica que user esté definido antes de hacer la llamada
    //             const response = await axios.get(`http://localhost:3306/usuario/${userID}/gruposchat`);
    //             setGroups(response.data);
    //             console.log("GRUPOS:", response.data);
    //             // console.log("USUARIO:", userID);
    //             // console.log("RECEIVER:", receiverID);
    //             // }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     fetchGroups();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userID, myChat]);



    function handleDeleteChat(event, conversation) {
        event.preventDefault();
        event.stopPropagation();
        setSelectedConversation(conversation.user);
        const newConversations = conversationsState.filter((c) => c !== conversation);
        // setConversationsState(newConversations);
        vaciarReceiver(true, conversation.user);

        // //borrar en base de datos
        fetch(`http://localhost:3306/conversaciones/${conversation.user}/${userID}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setConversationsState(newConversations);
            })
            .catch(error => {
                console.error(error);
                setConversationsState(conversationsState);
            });
    };

    function handleClick(receiverID, receiverNOMBRE, groupID, groupNOMBRE) {
        if (receiverID && receiverNOMBRE) {
            
            setReceiverID(receiverID);
            const newNotifications = {
                ...notifications,
                [receiverID]: { numero: null, destino: receiverID }
            };
            setNotifications(newNotifications);
            onConversationSelect(receiverID, receiverNOMBRE, notifications);
            console.log("NOTIFICACIONES: ", notifications)
        }
        if(groupID && groupNOMBRE){
            console.log("SELECCIONASTE UN GRUPO");
            setGroupID(groupID);
            onConversationSelect(null, null, null, groupID, groupNOMBRE);
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

        // async function fetchUserNames() {
        //     const ids = conversationsState.map(conversation => conversation.user);
        //     const requests = ids.map(id =>
        //         fetch(`http://localhost:3306/usuarios/${id}`).then(response =>
        //             response.json()
        //         )
        //     );
        //     const results = await Promise.all(requests);
        //     const names = results.reduce((acc, users, index) => {
        //         if (users.length === 0) {
        //             console.error(`No se encontró el usuario con id ${ids[index]}`);
        //         } else {
        //             acc[ids[index]] = users[0].nombre;
        //         }
        //         return acc;
        //     }, {});
        //     setUserNames(names);
        // }
        // fetchUserNames();
    }, [conversationsState]);

    return (
        <ConversationListWrapper>

            {groups.map(group => (
                <ConversationListItem key={group.id} onClick={() => handleClick(null, null, group.id, group.nombre)}>
                    <LeftWrapper>
                        <ConversationInfo>
                            <UserName><WhiteTiGroup/>  {group.nombre}</UserName>
                            {
                                group.users.map(user => (

                                    <Date key={user.id}>{user.nombre}</Date>

                                ))
                            }
                        </ConversationInfo>

                    </LeftWrapper>
                </ConversationListItem>
            ))}

            {conversationsState.map(conversation => (
                <ConversationListItem key={conversation.user} onClick={() => handleClick(conversation.user, userNames[conversation.user])}>
                    <LeftWrapper>
                        <ConversationInfo>
                            <UserName>{userNames[conversation.user]}</UserName>
                            <Date>
                                {DateTime.fromISO(conversation.last_message_date).setZone('UTC').toFormat(
                                    'HH:mm dd/MM/yyyy'
                                )}
                            </Date>
                        </ConversationInfo>

                    </LeftWrapper>

                    <DeleteButtonWrapper>
                        {/* {parseInt(notifications.origen) === parseInt(conversation.user) && ( 
                        <Notification>{}</Notification>
                         )} */}
                        {Object.keys(notifications).map((key) => (
                            key === conversation.user.toString() ? (
                                <Notification key={conversation.user}>
                                    {notifications[key].numero}
                                </Notification>
                            ) : null
                        ))}
                        <DeleteButton onClick={(e) => handleDeleteChat(e, conversation)}><RiDeleteBinLine/></DeleteButton>
                    </DeleteButtonWrapper>
                </ConversationListItem>
            ))}
        </ConversationListWrapper>
    );
}

export default ConversationList;

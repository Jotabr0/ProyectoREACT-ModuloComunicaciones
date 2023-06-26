import React, { useState } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(0,174,157);
  background: radial-gradient(circle, rgba(0,174,157,1) 0%, rgba(0,0,0,1) 100%);
  min-height: 100vh;
  padding: 50px;
  background-color: black;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  text-align: center;
  font-size: 3rem;
  color: #00CCB8;
  text-shadow: 0px 0px 20px #0d2e2c;
`;

const FormContainer = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  margin-bottom: 20px;
  height: 50px;
  width: 70%;
  border-radius: 10px;
  border: none;
  background-color: #f2f2f2;
  font-size: 1.5rem;
  padding: 0 20px;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  width: 50%;
  height: 50px;
  font-weight: bold;
  border-radius: 10px;
  font-size: 1.5rem;
  background-color: #075e54;
  border-width: 0;
  color: #fff;
  cursor: pointer;

  &:hover {
    
    background-color: #00CCB8;
  }

`;

export default function UserLogin({ setUser }) {
  const [user, setAUser] = useState('');

  function handleSetUser(event) {
    event.preventDefault();
    if (!user) return;


    fetch(`http://localhost:3306/usuarios/${user}`)
      .then(response => response.json())
      .then(data => {
        let userName = "";
        data.map((e) => {
          return userName = e.nombre;
        });
        // Guardar valores en localStorage
        localStorage.setItem("user", JSON.stringify({ id: user, nombre: userName }));


        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userObj = JSON.parse(storedUser);
          setUser(userObj);
        }


      })
      .catch(error => console.error(error));

    // localStorage.setItem('user', user);
    // setUser(user);
  }

  return (
    <Container>
      <Title>
        <CommentOutlined style={{ fontSize: '3rem', color: '#00CCB8' }} /> ARGOS COMUNICADOR
      </Title>

      <FormContainer onSubmit={handleSetUser}>
        <Input
          value={user}
          onChange={(e) => setAUser(e.target.value)}
          placeholder="ID de Usuario"
        />
        <StyledButton type="submit">Login</StyledButton>
      </FormContainer>
    </Container>
  );
}

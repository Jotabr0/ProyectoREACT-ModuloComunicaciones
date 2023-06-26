import React, { useState } from 'react';
import styled from 'styled-components';
import enviar from "../Media/enviarButton.png";

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  padding: 20px;
  background-color: black;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  font-weight: bold;
  border-radius: 50%;
  font-size: 18px;
  background-color: #00CCB8;
  border-width: 0;
  color: #fff;
  margin-left: 20px;
  background-image: url(${enviar});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30px;
  cursor: pointer;


  &:active {
    /* transform: translateY(2px); */
    transform: scale(1.2);
  }
  &:hover {
    background-color: #00fee5;
  }
`;

const Textarea = styled.textarea`
  width: 70%;
  padding: 10px;
  font-size: 18px;
  resize: none;
`;

export default function InputText({ addMessage }) {
  const [message, setMessage] = useState('');

  function handlerMessage() {
    addMessage({
      message,
    });
    setMessage('');
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handlerMessage();
    }
  }

  return (
    <TextContainer>
      <Textarea
        rows={1}
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <Button onClick={handlerMessage} />
    </TextContainer>
  );
}

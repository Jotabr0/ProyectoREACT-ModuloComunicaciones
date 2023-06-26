import React from 'react';
import styled from 'styled-components';

const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChatBoxMessage = styled.p`
  padding: 10px;
  border-radius: 10px;
  max-width: 100%;
  font-size: 13px;
`;

const ChatBoxReceiverWrapper = styled(ChatBoxWrapper)`
  justify-content: flex-start;
`;

const ChatBoxReceiverMessage = styled(ChatBoxMessage)`
  background-color: greenyellow;
`;

const ChatBoxDate = styled.p`
  margin-top: 5px;
  font-size: 11px;
  color: gray;
`;

export default function ChatBoxReceiver({ user, message, fecha }) {
  return (
    <ChatBoxReceiverWrapper>
      <div>
        <ChatBoxReceiverMessage>
          <strong>{user}</strong>
          <br />
          {message}
        </ChatBoxReceiverMessage>
        <ChatBoxDate>{fecha}</ChatBoxDate>
      </div>
    </ChatBoxReceiverWrapper>
  );
}

const ChatBoxSenderWrapper = styled(ChatBoxWrapper)`
  justify-content: flex-end;
  
`;

const ChatBoxSenderMessage = styled(ChatBoxMessage)`
  background-color: #00fee5;
`;

export function ChatBoxSender({ user, message, fecha }) {
  return (
    <ChatBoxSenderWrapper>
      <div>
        <ChatBoxSenderMessage>
          <strong>{user}</strong>
          <br />
          {message}
        </ChatBoxSenderMessage>
        <ChatBoxDate>{fecha}</ChatBoxDate>
      </div>
    </ChatBoxSenderWrapper>
  );
}

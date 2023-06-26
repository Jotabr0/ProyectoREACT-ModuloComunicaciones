// Socket.js

import socketIOClient from "socket.io-client";

const socketio = socketIOClient("http://localhost:5001");

export default socketio;

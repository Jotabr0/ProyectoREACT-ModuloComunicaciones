const express = require("express");
const http = require("http");
const Server = require("socket.io").Server;
const app = express();
const axios = require('axios');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const clients = {
  users: [],

  addUser(socketid) {
    this.users.push({ socketid });
  },

  updateUser(socketid, user) {
    const index = this.users.findIndex(u => u.socketid === socketid);
    if (index !== -1) {
      this.users[index].user = user;
    }
  },

  getUser(socketid) {
    const index = this.users.findIndex(u => u.socketid === socketid);
    if (index !== -1) {
      return this.users[index].user;
    }
    return null;
  },

  getSocket(userid) {
    const index = this.users.findIndex(u => u.user == userid);
    if (index !== -1) {
      return this.users[index].socketid;
    }
    return null;
  },
  
  removeUser(socketid) {
    const index = this.users.findIndex(u => u.socketid === socketid);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
};

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // clients[socket.id] = socket;

  clients.addUser(socket.id);

  console.log(`Current clients: ${JSON.stringify(clients.users)}`);

  socket.on("chat", ({ message, userID }) => {
    const userSocketID = clients.getSocket(userID);
    console.log("SOCKET DESTINO",userSocketID, "MENSAJE DESTINO", message);
    if (userSocketID) {
      io.to(userSocketID).emit("chat", { message, userID });
    }
  });
  

  
  socket.on("login", async(userID) => {
    clients.updateUser(socket.id, userID);
    
    console.log(`Current clients: ${JSON.stringify(clients.users)}`);
    console.log(`---------------------------------------------------`);

     // Obtener grupos de chat del usuario
     const groupsResponse = await axios.get(`http://localhost:3306/usuario/${userID}/gruposchat`);
     const groups = groupsResponse.data;
 
     // Unirse a las salas correspondientes a los grupos de chat
     groups.forEach((group) => {
       const roomID = `group_${group.id}`;
       socket.join(roomID);
     });
  
  });

  socket.on("chatGrupo", ({ message, groupID }) => {
    const roomID = `group_${groupID}`;
    io.to(roomID).emit("chatGrupo", { message, groupID });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    clients.removeUser(socket.id);
    console.log(`Current clients: ${JSON.stringify(clients.users)}`);
  });


});

server.listen(5001, () => console.log("Listening to port 5001"));

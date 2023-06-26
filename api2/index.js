const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "10.1.10.1",
  user: "polluelos",
  password: "polluelos123",
  database: "COMUNICADOR_DEV",
});

// // Configuración de la conexión a la base de datos MySQL
// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "COMUNICADOR_DEV",
// });

// Conexión a la base de datos MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

// Configuración de la aplicación Express
const app = express();
const port = process.env.PORT || 3306;
// const port = process.env.PORT || 3307;


// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

app.use(cors());

//               USUARIOS

// Endpoint para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM Usuarios", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Endpoint para agregar un nuevo usuario
app.post("/usuarios", (req, res) => {
  const usuario = req.body;
  connection.query("INSERT INTO Usuarios SET ?", usuario, (error, result) => {
    if (error) throw error;
    res.status(201).send(`Usuario agregado con ID: ${result.insertId}`);
  });
});

//                  MENSAJES
app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM Usuarios WHERE id = ? LIMIT 1",
    id,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    });
});

//                  MENSAJES

//Mensajes entre 2 usuarios

app.get("/mensajes/:receiver/:sender", (req, res) => {
  const receiver = req.params.receiver;
  const sender = req.params.sender;
  connection.query(
    "SELECT * FROM Mensajes WHERE (receiver = ? AND sender = ?) OR (receiver = ? AND sender = ?)",
    [receiver, sender, sender, receiver],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

//Mensajes de un determinado Grupo de Chat

app.get("/mensajes/:grupo_id", (req, res) => {
  const grupo_id = req.params.grupo_id;
  connection.query(
    "SELECT * FROM Mensajes WHERE grupo_id = ?",
    [grupo_id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


app.get("/mensajes", (req, res) => {

  connection.query("SELECT * FROM Mensajes", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


app.post("/mensaje", (req, res) => {
  const mensaje = req.body;
  connection.query("INSERT INTO Mensajes SET ?", mensaje, (error, result) => {
    if (error) throw error;
    res.status(201).send(`Mensaje agregado con ID: ${result.insertId}`);
  });
});


// CONVERSACIONES INDIVIDUALES

app.get("/conversaciones/:user", (req, res) => {
  const user = req.params.user;
  connection.query(
    `SELECT DISTINCT 
      CASE
        WHEN sender = '${user}' THEN receiver
        ELSE sender
      END AS user,
      MAX(CONVERT_TZ(date, '+00:00', '+02:00')) AS last_message_date
    FROM Mensajes
    WHERE (sender = '${user}' OR receiver = '${user}')
      AND receiver IS NOT NULL
    GROUP BY user
    ORDER BY last_message_date DESC`,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


app.delete("/conversaciones/:user1/:user2", (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;

  connection.query(
    `DELETE FROM Mensajes
     WHERE (sender = '${user1}' AND receiver = '${user2}') OR
           (sender = '${user2}' AND receiver = '${user1}')`,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


                    //GRUPOS 

//Grupos con su array de usuarios
app.get("/grupos/usuarios", (req, res) => {
  connection.query("SELECT g.id as grupo_id, g.nombre as nombre_grupo, u.id as usuario_id, u.nombre, u.telefono FROM Grupos g INNER JOIN UsuarioGrupo ug ON g.id = ug.grupo_id INNER JOIN Usuarios u ON ug.usuario_id = u.id ORDER BY g.id;",
  (error, results) => {
    if (error) throw error;
    let grupos = {};
    results.forEach(function(usuario) {
      if (!grupos[usuario.grupo_id]) {
        grupos[usuario.grupo_id] = {
          nombre_grupo: usuario.nombre_grupo,
          usuarios: []
        }; 
      }
      grupos[usuario.grupo_id].usuarios.push({
        grupo: usuario.nombre_grupo,
        usuario_id: usuario.usuario_id,
        nombre: usuario.nombre,
        telefono: usuario.telefono
      });
    });
    res.send(grupos);
  });
});



app.get("/grupos", (req, res) => {
  connection.query("SELECT * FROM Grupos", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


//Usuarios del Grupo con ID :id
app.get("/grupo/:id/usuarios", (req, res) => {
  const grupoId = req.params.id;
  connection.query(
    "SELECT * FROM Usuarios INNER JOIN UsuarioGrupo ON Usuarios.id = UsuarioGrupo.usuario_id WHERE UsuarioGrupo.grupo_id = ?",
    grupoId,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

//Grupos a los que pertenece el Usuario con id :id
app.get("/usuario/:id/grupos", (req, res) => {
  const usuarioId = req.params.id;
  connection.query(
    "SELECT Grupos.* FROM Grupos INNER JOIN UsuarioGrupo ON Grupos.id = UsuarioGrupo.grupo_id WHERE UsuarioGrupo.usuario_id = ?",
    usuarioId,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

//Grupos de chat a los que pertenece el Usuario con id :id  CAMBIAR BASE DE DATOS Y ADAPTAR 

app.get("/usuario/:id/gruposchat", (req, res) => {
  const usuarioId = req.params.id;
  connection.query(
    "SELECT Grupos.* FROM Grupos INNER JOIN UsuarioGrupo ON Grupos.id = UsuarioGrupo.grupo_id WHERE UsuarioGrupo.usuario_id = ? AND tipo = 'chat'",
    // "SELECT Grupos.* FROM Grupos INNER JOIN GruposChat ON Grupos.id = GruposChat.grupo_id WHERE GruposChat.usuario_id = ?",
    usuarioId,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

//Usuarios del GrupoChat con ID :id

app.get("/grupoChat/:id/usuarios", (req, res) => {
  const grupoId = req.params.id;
  connection.query(
    "SELECT * FROM Usuarios INNER JOIN UsuarioGrupo ON Usuarios.id = UsuarioGrupo.usuario_id WHERE UsuarioGrupo.grupo_id = ?",
    // "SELECT * FROM Usuarios INNER JOIN GruposChat ON Usuarios.id = GruposChat.usuario_id WHERE GruposChat.grupo_id = ?",
    grupoId,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
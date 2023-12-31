const express = require('express');
const app = express();
const SERVER_PORT = 4791; //porta da cambiare per il server
const APPLICATION_PORT = 4792; //porta da cambiare per l'applicazione

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:" + APPLICATION_PORT
    }
});

let users = [];

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
        socket.broadcast.emit('typingResponse', '')
    });

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    //Listens when a new user joins the server
    socket.on('newUser', (data) => {
        //Adds the new user to the list of users
        users.push(data);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});

app.get('/', (req, res) => {
    res.send(`Server started on port ${SERVER_PORT}`)
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(SERVER_PORT, () => {
    console.log(`Server listening on ${SERVER_PORT}`);
});
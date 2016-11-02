// server.js

const express = require('express');
const SocketServer = require('ws').Server;

var uuid = require('node-uuid');

// Set the port to 4000
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

var incoming_message = '';

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // broadcast
  // wss.broadcast(incoming_message);

  // server receives message
  ws.on('message', function(data, flags) {
    incoming_message = JSON.parse(data);
    // console.log(incoming_message.content);
    incoming_message.id = uuid.v4();
    console.log(incoming_message);
    
    wss.broadcast(JSON.stringify(incoming_message));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

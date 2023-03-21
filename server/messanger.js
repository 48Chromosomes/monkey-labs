const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });
const clients = [];

wss.on('connection', (ws) => {
  console.log('Client connected');

  clients.push(ws);

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

wss.on('listening', () => {
  console.log('WebSocket server listening on port 8000');
});

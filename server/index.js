const WebSocket = require('ws');

let wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New player has connected!');

    ws.on("close", () => {
        console.log('Player has disconnected');
    })
})
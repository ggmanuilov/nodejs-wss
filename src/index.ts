import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const index = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server: index });


wss.on('close', ()=>{
    console.log('websocket closed')
});

wss.on('connection', (ws: WebSocket) => {
    //connection is up, let's add a simple event
    ws.on('message', (message: string) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
index.listen(process.env.PORT || 3001, () => {
    // @ts-ignore
    console.log(`Server started on port '${index.address().address}':${index.address().port} family: '${index.address().family}' :)`);
});
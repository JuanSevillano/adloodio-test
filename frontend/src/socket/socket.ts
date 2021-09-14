import openSocket, { Socket } from 'socket.io-client';

const socket: Socket = openSocket('http://localhost:4848');

socket.on('order', data => {
    if (data.action === 'ready') {
        console.log('Esta listo el Notification!! papá ')
    }
})

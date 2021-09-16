import store from '../store/store';
import openSocket, { Socket } from 'socket.io-client';
import { ORDER_READY } from '../store/types/cartTypes';


interface SocketI {
    url: string;
    socket: Socket;
}

export default class SocketController implements SocketI {

    url: string;
    socket: Socket;


    constructor(url: string) {
        this.url = url
        this.socket = openSocket(url);
        this.routes();

    }


    routes() {

        this.socket.on('order', data => {
            if (data.action === 'ready') {

                store.dispatch({
                    type: ORDER_READY,
                    payload: { order: data.payload }
                })

            }
        })

    }
}
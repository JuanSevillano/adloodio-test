import { Server as HttpServer } from "http";
import { Server } from "socket.io";

interface Socket {
    io: Server;
    server: HttpServer;
}

export interface SocketMessage {
    channel: string;
    action: string;
    payload: Object;
}

const corsOptions = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
};

export default class SocketIoService implements Socket {

    io: Server;
    server: HttpServer;

    constructor(server: HttpServer) {
        this.server = server;
        this.io = new Server(server, corsOptions);
        this.connections();
    }

    connections(): void {
        this.io.on('connection', (socket: any) => {

            console.log('[ Client connected to Socket]')
        })
    }

    sendMessage(message: SocketMessage): void {

        const { channel, action, payload } = message;
        this.io.emit(channel, { action, payload });

    }


}
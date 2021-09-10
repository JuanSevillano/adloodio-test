import express, { Application } from 'express'
import morgan from 'morgan';

export class App {

    private app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
    }

    middlewares() {
        this.app.use(morgan('dev'))
    }

    listen(port: number) {
        this.app.listen(port)
        console.log(`[ App.js, 19 ] => listening on port ${port}`)
    }
}
import express, { Application } from 'express';
import { Server } from 'http';

import morgan from 'morgan';
import cors from 'cors';

import MySQLDatabaseService from './frameworks/mySQLService';


import CategoryRouter from './routes/category.routes';
import IndexRouter from './routes/index.routes';
import OrderRouter from './routes/order.routes';
import UserRouter from './routes/user.routes';
import SocketIoService from './frameworks/socketIoService';


const whiteList: Array<String> = ['http://localhost:3000'];

const corsOption: Object = {
    origin: (origin: string, cb: CallableFunction) => {
        if (whiteList.indexOf(origin) !== -1) {
            cb(null, true);
        } else {
            cb(new Error('Not allowed by cors'))
        }
    }
}


export class App {

    private app: Application;
    private database: MySQLDatabaseService;

    private socket: SocketIoService;

    private indexRouter: IndexRouter;
    private categoryRouter: CategoryRouter;
    private userRotuer: UserRouter;
    private orderRouter: OrderRouter;

    constructor(database: MySQLDatabaseService, port: number) {

        this.database = database;
        this.app = express();
        this.middlewares();

        const server = this.app.listen(port);
        this.socket = new SocketIoService(server);


        this.indexRouter = new IndexRouter(this.database);
        this.categoryRouter = new CategoryRouter(this.database);
        this.userRotuer = new UserRouter(this.database);
        this.orderRouter = new OrderRouter(this.database, this.socket);


        this.routes();

    }

    middlewares() {

        this.app.use(morgan('dev'));

        this.app.use(express.json());

        this.app.use(cors());

    }


    routes() {

        this.app.use('/', this.indexRouter.router);

        this.app.use('/category', this.categoryRouter.router);

        this.app.use('/user', this.userRotuer.router);

        this.app.use('/order', this.orderRouter.router);


    }


}
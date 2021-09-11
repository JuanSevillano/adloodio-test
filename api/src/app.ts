import express, { Application } from 'express'
import morgan from 'morgan';
import MySQLDatabaseService from './frameworks/mySQLService';
import IndexRouter from './routes/index.routes';


export class App {

    private app: Application;
    private database: MySQLDatabaseService;
    private indexRouter: IndexRouter;

    constructor(database: MySQLDatabaseService) {
        this.database = database;
        this.app = express();
        this.middlewares();

        this.indexRouter = new IndexRouter(this.database)

        this.routes();


    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }


    routes() {
        this.app.use('/', this.indexRouter.router);
    }

    listen(port: number) {
        this.app.listen(port);
        console.log(`[ App.js, 19 ] => listening on port ${port}`)
    }
}
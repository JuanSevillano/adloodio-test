import express, { Application } from 'express'
import morgan from 'morgan';
import MySQLDatabaseService from './frameworks/mySQLService';
import CategoryRouter from './routes/category.routes';
import IndexRouter from './routes/index.routes';
import UserRouter from './routes/user.routes';


export class App {

    private app: Application;
    private database: MySQLDatabaseService;
    private indexRouter: IndexRouter;
    private categoryRouter: CategoryRouter;
    private userRotuer: UserRouter;

    constructor(database: MySQLDatabaseService) {

        this.database = database;
        this.app = express();
        this.middlewares();

        this.indexRouter = new IndexRouter(this.database);
        this.categoryRouter = new CategoryRouter(this.database);
        this.userRotuer = new UserRouter(this.database);
        this.routes();

    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }


    routes() {

        this.app.use('/', this.indexRouter.router);

        this.app.use('/category', this.categoryRouter.router);

        this.app.use('/user', this.userRotuer.router);

    }

    listen(port: number) {
        this.app.listen(port);
        console.log(`[ App.js, 19 ] => listening on port ${port}`)
    }
}
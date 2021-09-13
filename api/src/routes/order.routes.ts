import { Router } from "express";
import OrderController from "../controllers/order.controller";
import MySQLDatabaseService from "../frameworks/mySQLService";
import SocketIoService from "../frameworks/socketIoService";

export default class OrderRouter {

    controller: OrderController;
    router: Router;

    constructor(database: MySQLDatabaseService, socket: SocketIoService) {

        this.controller = new OrderController(database, socket);
        this.router = Router();
        this.routes();
    }

    routes() {

        this.router.get('/', this.controller.findAll);

        this.router.get('/:id', this.controller.findOne);

        this.router.post('/', this.controller.creteOrder);

    }
}
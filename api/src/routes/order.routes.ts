import { Router } from "express";
import OrderController from "../controllers/order.controller";
import MySQLDatabaseService from "../frameworks/mySQLService";

export default class OrderRouter {

    controller: OrderController;
    router: Router;

    constructor(database: MySQLDatabaseService) {

        this.controller = new OrderController(database);
        this.router = Router();
        this.routes();
    }

    routes() {

        this.router.get('/', this.controller.findAll);

        this.router.get('/:id', this.controller.findOne);

        this.router.post('/', this.controller.creteOrder);

    }
}
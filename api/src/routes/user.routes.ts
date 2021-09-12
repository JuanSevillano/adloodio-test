import { Router } from "express";
import UserController from "../controllers/user.controller";
import MySQLDatabaseService from "../frameworks/mySQLService";

export default class UserRouter {

    controller: UserController;
    router: Router;

    constructor(database: MySQLDatabaseService) {

        this.controller = new UserController(database);
        this.router = Router();
        this.routes();

    }

    routes() {

        this.router.post('/', this.controller.createUser);

    }
}
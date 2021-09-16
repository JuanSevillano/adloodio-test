import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import MySQLDatabaseService from "../frameworks/mySQLService";

export default class CategoryRouter {

    controller: CategoryController;
    router: Router;

    constructor(database: MySQLDatabaseService) {

        this.controller = new CategoryController(database);
        this.router = Router();
        this.routes();

    }


    routes() {

        this.router.get('/', this.controller.finAdll);

        this.router.get('/:name', this.controller.findOne);

        this.router.post('/', this.controller.createCategory);


    }
}
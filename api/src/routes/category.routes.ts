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
        // this.router.get('/categories', this.foodController.deleteFood)
        // this.router.get('/category/:id', this.foodController.deleteFood)
        this.router.get('/', this.controller.getAll)
        this.router.post('/', this.controller.createCategory)
    }
}
import { Router } from "express";
import FoodController from "../controllers/food.controller";
import MySQLDatabaseService from "../frameworks/mySQLService";

export default class IndexRouter {

    foodController: FoodController;
    router: Router;

    constructor(database: MySQLDatabaseService) {
        this.foodController = new FoodController(database)

        this.router = Router();
        this.routes();
    }


    routes() {

        this.router.get('/', this.foodController.getMenu)
        this.router.post('/food', this.foodController.createFood)
    }


}


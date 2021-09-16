import { Router } from "express";
import CategoryController from "../controllers/category.controller";
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

        this.router.get('/', this.foodController.getMenu);

        this.router.post('/food', this.foodController.createFood);

        this.router.get('/food/:id', this.foodController.findDishById);

        this.router.delete('/food/:id', this.foodController.deleteFood);

        this.router.get('/food/name/:id', this.foodController.findDishByName);

    }


}


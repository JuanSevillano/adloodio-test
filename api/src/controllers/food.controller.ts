import { Request, Response } from "express";
import MySQLDatabaseService from "../frameworks/mySQLService";
import { FoodProps } from "../models/food";


interface Menu {
    categories: Array<Object>;
    food: Array<Object>
}

export default class FoodController {

    database: MySQLDatabaseService;

    constructor(database: MySQLDatabaseService) {
        this.database = database;
    }

    getMenu = async (req: Request, res: Response): Promise<Response> => {
        try {

            const _food = await this.database.foods.findAll()
            const _categories = await this.database.categories.findAll()

            const menu: Menu = {
                categories: _categories,
                food: _food
            }

            return res.json(menu)


        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    }


    createFood = async (req: Request, res: Response): Promise<Response> => {
        try {

            const newFood: FoodProps = { ...req.body }
            const _result = await this.database.foods.create(newFood)
            return res.json(_result)

        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }




}
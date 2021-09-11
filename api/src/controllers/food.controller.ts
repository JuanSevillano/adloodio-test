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


    deleteFood = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { id } = req.params
            const _found = await this.database.foods.findByPk(id)

            if (!_found) {
                return res.status(404).json({
                    message: 'No entry with this id was found '
                })
            }

            _found.destroy();
            return res.status(200).json({ message: 'Item removed properly' })

        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }






}
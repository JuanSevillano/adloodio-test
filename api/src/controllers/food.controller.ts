import { Request, Response } from "express";
import MySQLDatabaseService from "../frameworks/mySQLService";
import { FoodI, FoodProps } from "../models/food";


interface Menu {
    categories: Array<Object>;
    food: Array<Object>
}

export default class FoodController {

    database: MySQLDatabaseService;

    constructor(database: MySQLDatabaseService) {
        this.database = database;
    }



    findDishByName = async (req: Request, res: Response): Promise<Response> => {
        try {


            const { name } = req.params;

            if (!name) {
                return res.status(400)
                    .json({ message: 'Error [name] param is missing ' });
            }

            const dish = await this.database.foods.findOne({
                where: [{ name }]
            });

            return res.status(200).json(dish)


        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    }


    findDishById = async (req: Request, res: Response): Promise<Response> => {
        try {


            const { id } = req.params;

            if (!id) {
                return res.status(400)
                    .json({ message: 'Error [id] param is missing ' });
            }

            const dish = await this.database.foods.findOne({
                where: [{ id }]
            });

            return res.status(200).json(dish)


        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
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

            const { category } = req.body;

            if (!category) {
                return res.status(400).json({ message: 'Bad body request ' });
            }

            const foodBody: FoodProps = { ...req.body };
            const query = { where: { name: category } };
            const _category = await this.database.categories.findOne(query);

            if (!_category) {
                return res.status(400).json({ message: 'The given Category is not valid' });
            }

            const newFood: Object = {
                ...foodBody,
                CategoryId: _category.id
            }
            const _food = await this.database.foods.create({ ...newFood })
            return res.json(_food)

        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }


    deleteFood = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { id } = req.params

            if (!id) {
                return res.status(400).json({
                    message: 'Bad body request: [ id ] param is missing '
                });
            }
            const _found = await this.database.foods.findByPk(id)

            if (!_found) {
                return res.status(404).json({
                    message: 'No entry with this id was found '
                });
            }

            _found.destroy();
            return res.status(200).json({ message: 'Item removed properly' })

        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }


    //TODO: Update food 





}
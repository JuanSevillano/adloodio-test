import { Request, Response } from "express";
import MySQLDatabaseService from "../frameworks/mySQLService";
import { CategoryProps } from "../models/category";

export default class CategoryController {

    database: MySQLDatabaseService;

    constructor(database: MySQLDatabaseService) {
        this.database = database;
    }



    findOne = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { name } = req.params;
            if (!name) {
                return res.status(400)
                    .json({ message: 'Error, [ name  ] param is missing ' });

            }
            // Wanst able to make the include structure to retrieve all
            // connected tables in a query, but here's split in steps..
            const query = { where: [{ name }] }
            const category = await this.database.categories.findOne(query);

            if (!category) {
                return res.status(404)
                    .json({ message: 'Not category found with given name' });
            }

            const dishes = await this.database.foods.findAll({
                where: [{ CategoryId: category.id }]
            })


            const fullCategory = {
                category,
                dishes
            }

            return res.status(200).json(fullCategory)


        } catch (error) {
            return res.status(500).json(error)
        }
    }


    finAdll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const categories = await this.database.categories.findAll();
            return res.status(201).json(categories);

        } catch (error) {
            return res.status(400).json({ message: 'Not categories added yet' });
        }
    }

    createCategory = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { name, img } = req.body;
            if (!name || !img) {
                return res.status(400).json({ message: ' Bad request: [ name ] param missing' });
            }

            const categoryExist = await this.database.categories
                .findOne({ where: [{ name: name }] });

            if (categoryExist) {
                return res.status(400).json({ message: 'Category exist already ' });
            }

            const _newCategory: CategoryProps = { id: null, name, image_cover: img };
            const category = await this.database.categories.create(_newCategory);
            return res.status(200).json(category);


        } catch (error) {
            return res.status(400).json({ message: 'Error creating new category' });
        }

    }






}
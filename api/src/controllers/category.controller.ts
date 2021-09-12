import { Request, Response } from "express";
import MySQLDatabaseService from "../frameworks/mySQLService";
import { CategoryProps } from "../models/category";

export default class CategoryController {

    database: MySQLDatabaseService;

    constructor(database: MySQLDatabaseService) {
        this.database = database;
    }


    getAll = async (req: Request, res: Response): Promise<Response> => {
        try {

            const categories = await this.database.categories.findAll();
            return res.status(201).json(categories);

        } catch (error) {
            return res.status(400).json({ message: 'Not categories added yet' })
        }
    }

    createCategory = async (req: Request, res: Response): Promise<Response> => {
        try {

            const _newCategory: CategoryProps = {
                id: null,
                name: req.body.name
            }

            const category = await this.database.categories.create(_newCategory)

            return res.status(200).json(category)

        } catch (error) {
            return res.status(400).json({ message: 'Error creating new category' })
        }

    }






}
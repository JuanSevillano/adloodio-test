import { Request, Response } from "express";
import MySQLDatabaseService from "../frameworks/mySQLService";
import { UserProps } from "../models/user";

export default class UserController {

    database: MySQLDatabaseService;

    constructor(database: MySQLDatabaseService) {

        this.database = database;

    }


    createUser = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { name, phone, email } = req.body;

            if (!phone || !name || !email) {
                return res.status(400)
                    .json({ message: `Error bad request: [ phone: ${phone}, name: ${name}, email: ${email}  ] param missing` });
            }


            const userExist = await this.database.users.findOne({
                where: [{
                    phone: phone
                }]
            })


            if (userExist) {
                return res.status(405).json({ message: 'User exist already ' })
            }

            const newUser: UserProps = {
                id: null,
                name,
                phone,
                email,
                blocked: false
            }

            const userCreated = await this.database.users.create(newUser)

            return res.status(200).json(userCreated)
        } catch (error) {
            console.log('[ TOMA TU ERROR ]', error)
            return res.status(200).json({ message: 'Error bad request' })
        }
    }

}
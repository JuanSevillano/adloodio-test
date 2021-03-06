import { Request, Response } from "express";
import { setTimeout } from "timers";
import MySQLDatabaseService from "../frameworks/mySQLService";
import SocketIoService, { SocketMessage } from "../frameworks/socketIoService";
import { MealI } from "../models/meal";
import { OrderProps } from "../models/order";




interface Order {
    id?: number;
    status: number;
    meals: Array<MealI>;
    totalPrice: number;
    UserId: number;
}


export default class OrderController {

    socket: SocketIoService;
    database: MySQLDatabaseService;

    constructor(database: MySQLDatabaseService, socket: SocketIoService) {
        this.database = database;
        this.socket = socket;
    }


    findOne = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { id } = req.params;
            if (!id) {
                return res.status(400)
                    .json({ message: `Bad request: [ id: ${id} param missing ` });
            }

            const query = { where: [{ id }] };
            const order = await this.database.orders.findOne(query);
            const meals = await this.database.meals.findAll({
                where: [{ OrderId: order.id }]
            })

            if (!order) {
                return res.status(404).json({ message: `Not order found ` });
            }

            return res.status(200).json({ ...order.dataValues, meals });

        } catch (error) {
            return res.status(500).json(error);
        }
    }


    findAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const orders = await this.database.orders.findAll();
            return res.status(201).json(orders);
        } catch (error) {

            return res.status(500).json(error);
        }
    }

    creteOrder = async (req: Request, res: Response): Promise<Response> => {
        try {


            const { meals } = req.body;
            if (!meals) {
                return res.status(400)
                    .json({ message: `Bad request: [ email:  meals: ${meals} ] params missing ` });
            }

            // const userExist = await this.database.users.findOne({ where: [{ email: email }] })
            // if (!userExist) {
            //     return res.status(403)
            //         .json({ message: 'User is not allowed to order, should register first ' });
            // }

            const newOrder: Order = {
                status: 0,
                meals: [],
                totalPrice: 0,
                UserId: 1, // Fixed user id
            }

            const order = await this.database.orders.create(newOrder)
            let _totalPrice: number = 0

            for (const meal of meals) {

                const query = { where: [{ id: meal.id }] };
                const food = await this.database.foods.findOne(query);

                const mealPrice: number = food.price * meal.quantity;
                const newMeal = await this.database.meals.create({
                    quantity: meal.quantity,
                    price: mealPrice,
                    OrderId: order.id,
                    FoodId: food.id // Association with food // I wasnt able to use Meals as through table :( 
                })

                _totalPrice += newMeal.price;
                newOrder.meals.push(newMeal.id)
            }

            order.totalPrice = _totalPrice;
            order.setMeals(newOrder.meals);
            order.save();


            const notify: SocketMessage = {
                channel: 'order',
                action: 'ready',
                payload: order
            }

            // Wait 3sec to send message back
            setTimeout((): void => {
                this.socket.sendMessage(notify);
            }, 3000)


            return res.json({ order })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }


}
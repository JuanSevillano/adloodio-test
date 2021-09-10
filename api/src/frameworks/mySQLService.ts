import { Sequelize } from 'sequelize';
import { HasMany } from 'sequelize-typescript';

import CategoryModel, { CategoryI } from '../models/category';
import FoodModel from '../models/food';
import MealModel from '../models/meal';
import OrderModel from '../models/order';
import UserModel from '../models/user';

// import Order from '../models/order';


export interface Database {
    database: string;
    username: string;
    password: string;
    host: string;
    sequelize: Sequelize;
}

export default class MySQLDatabaseService implements Database {

    database: string;
    username: string;
    password: string;
    host: string;
    sequelize: Sequelize;

    // categories?: any;
    // users?: any;
    // orders?: any;
    // meals?: any;
    // foods?: any;


    constructor(
        database: string,
        username: string,
        password: string,
        host: string,
    ) {

        this.host = host;
        this.database = database;
        this.username = username;
        this.password = password;


        const connectionOpts: Object = {
            dialect: 'mysql',
            host: this.host,
            models: [__dirname + '/models']
        };

        this.sequelize = new Sequelize(
            this.database,
            this.username,
            this.password,
            connectionOpts
        );

        this.sequelize.authenticate().then(async () => {

            console.log(`[ database.js, 38 ] => database connected ${this.database}:${this.host}`)
            this.initDatabase();
        })


    }



    initDatabase() {

        const categories = CategoryModel(this.sequelize)
        const foods = FoodModel(this.sequelize)
        const users = UserModel(this.sequelize)
        const meals = MealModel(this.sequelize)
        const orders = OrderModel(this.sequelize)

        categories.hasMany(foods)
        meals.hasOne(foods)
        orders.hasMany(meals)
        orders.belongsTo(users)
        users.hasMany(orders)

        this.sequelize.sync({ force: true })

    }

    public getInstance(): Sequelize {
        return this.sequelize;
    }



}
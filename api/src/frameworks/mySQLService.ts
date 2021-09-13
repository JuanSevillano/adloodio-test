
import { Model, Sequelize } from 'sequelize';


import CategoryModel from '../models/category';
import FoodModel from '../models/food';
import MealModel from '../models/meal';
import OrderModel from '../models/order';
import UserModel from '../models/user';


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

    categories?: any;
    users?: any;
    orders?: any;
    meals?: any;
    foods?: any;


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


        const categories = CategoryModel(this.sequelize);
        const foods = FoodModel(this.sequelize);
        const users = UserModel(this.sequelize);
        const orders = OrderModel(this.sequelize);
        const meals = MealModel(this.sequelize);

        this.categories = categories;
        this.foods = foods;
        this.users = users;
        this.orders = orders;
        this.meals = meals;

        // Maybe some redundance here, I'm not sure actually 
        this.categories.items = this.categories.hasMany(this.foods);
        this.foods.category = this.foods.belongsTo(this.categories);

        this.users.orders = this.users.hasMany(this.orders);
        this.orders.user = this.orders.belongsTo(this.users);

        // Not sure 
        this.foods.meals = this.foods.hasMany(this.meals);
        this.meals.foods = this.meals.belongsTo(this.foods);

        this.orders.meals = this.orders.hasMany(this.meals);
        this.meals.orders = this.meals.belongsTo(this.orders);



        foods.drop();
        meals.drop();
        this.sequelize.sync({ force: true });


    }

    public getInstance(): Sequelize {
        return this.sequelize;
    }



}
import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize/Types";

interface MealProps {
    id: number;
    quantity: number;
    price: number;
}

export interface MealI extends Model<MealProps>, MealProps { };

const MealModel = (sequelize: Sequelize) => sequelize.define<MealI>("Meal", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    quantity: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    price: {
        allowNull: true,
        type: DataTypes.FLOAT
    }
})


export default MealModel
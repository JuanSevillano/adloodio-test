import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize/types";


export interface FoodProps {
    id?: number;
    name: string;
    price: number;
    description: string;
    image_url: string;
    available: boolean;
}

export interface FoodI extends Model<FoodProps>, FoodProps { }

const FoodModel = (sequelize: Sequelize) => sequelize.define<FoodI>('Food', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    description: {
        type: new DataTypes.STRING(400),
        allowNull: false
    },
    image_url: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

export default FoodModel
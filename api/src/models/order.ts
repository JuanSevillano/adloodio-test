import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize/types";


export interface OrderProps {
    id?: number;
    status: number; // [0 = ordered, 1 = preparation, 2 = ready, 3 = picked] 
    totalPrice: number;
}

export interface OrderI extends Model<OrderProps>, OrderProps { };

const OrderModel = (sequelize: Sequelize) => sequelize.define<OrderI>('Order', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    totalPrice: {
        allowNull: false,
        type: DataTypes.FLOAT
    }
})

export default OrderModel

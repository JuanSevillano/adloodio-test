import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize/types";


type StringOrNull = string | null;
type NumberOrNull = number | null;


interface UserProps {
    id: NumberOrNull;
    name: string;
    phone: string;
    email?: StringOrNull;
    blocked: boolean;
}

export interface UserI extends Model<UserProps>, UserProps { };

const UserModel = (sequelize: Sequelize) => sequelize.define<UserI>("User", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    phone: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})


export default UserModel
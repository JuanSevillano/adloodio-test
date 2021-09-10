import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize/types";

interface CategoryProps {
    id: number;
    name: string;
}

export interface CategoryI extends Model<CategoryProps> { }

const CategoryModel = (sequelize: Sequelize) => sequelize.define<CategoryI>('Category', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: new DataTypes.STRING(128)
    }
})

export default CategoryModel
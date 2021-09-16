import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize/types";

export interface CategoryProps {
    id: number | null;
    name: string;
    image_cover: string;
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
    },
    image_cover: {
        allowNull: false,
        type: new DataTypes.STRING(255)
    }
})

export default CategoryModel
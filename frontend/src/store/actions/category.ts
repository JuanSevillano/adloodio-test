import axios from '../../app/axiosConfig';
import { Dispatch } from "redux";
import {
    CategoryDispatchType,
    LOAD_DETAIL_DISH,
    LOAD_DETAIL_DISH_FAILED,
    LOAD_DETAIL_DISH_SUCCESS,
    LOAD_CATEGORY,
    LOAD_CATEGORY_FAILED,
    LOAD_CATEGORY_SUCCESS
} from "../types/categoryTypes";
import { Dish } from '../types/homeTypes';



export const loadFullCategory = (categoryName: string) => async (dispatch: Dispatch<CategoryDispatchType>) => {
    try {

        dispatch({ type: LOAD_CATEGORY });
        const { data } = await axios.get(`/category/${categoryName}`);


        dispatch({
            type: LOAD_CATEGORY_SUCCESS,
            payload: {
                category: data.category,
                dishes: data.dishes
            }
        })


    } catch (error) {
        dispatch({
            type: LOAD_CATEGORY_FAILED,
            payload: { error: 'Error loading category dishes' }
        })
    }
}
export const loadFullDish = (id: number) => async (dispatch: Dispatch<CategoryDispatchType>) => {
    try {

        let _dish: Dish;
        dispatch({ type: LOAD_DETAIL_DISH });

        const { data } = await axios.get(`/food/${id}`);
        _dish = data;


        dispatch({
            type: LOAD_DETAIL_DISH_SUCCESS,
            payload: { dish: _dish }
        })


    } catch (error) {

        dispatch({
            type: LOAD_DETAIL_DISH_FAILED,
            payload: { error: 'Error loading dish' }
        })

    }
}
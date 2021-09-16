import axios from '../../app/axiosConfig';
import { Dispatch } from "redux";
import { HomeDispatchType, LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_DISHES_SUCCESS } from "../types/homeTypes";

export const loadHome = () => async (dispatch: Dispatch<HomeDispatchType>) => {
    try {

        dispatch({ type: LOAD_CATEGORIES });
        const { data } = await axios.get('/');

        dispatch({
            type: LOAD_CATEGORIES_SUCCESS,
            payload: { categories: data.categories }
        })


        dispatch({
            type: LOAD_DISHES_SUCCESS,
            payload: { dishes: data.food }
        })



    } catch (error) {
        console.log('Error ', error)
    }
}
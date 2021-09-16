import { Reducer } from "redux";
import { Category, Dish, HomeDispatchType, LoadHome, LOAD_CATEGORIES_SUCCESS, LOAD_DISHES_SUCCESS, LOAD_HOME } from "../types/homeTypes";

interface HomeI {
    categories: Category[],
    dishes: Dish[],
    loading: boolean;
    error: boolean;

}

const initialState: HomeI = {
    categories: [],
    dishes: [],
    loading: false,
    error: false,
}


const loadCategoriesSuccess = (state: HomeI, payload: any) => {
    const { categories } = payload;
    const updatedState: HomeI = { ...state }
    updatedState.categories = [...state.categories, ...categories];
    return updatedState
}


const loadDishesSuccess = (state: HomeI, payload: any) => {
    const { dishes } = payload;
    const updatedState: HomeI = { ...state }
    updatedState.dishes = [...state.dishes, ...dishes];
    return updatedState
}

const loadHomeStart = (state: HomeI, payload: LoadHome): HomeI => {
    return { ...state, loading: true }
}


const homeReducer: Reducer = (state: HomeI = initialState, action: HomeDispatchType): HomeI => {
    switch (action.type) {
        case LOAD_HOME: return loadHomeStart(state, action)
        case LOAD_CATEGORIES_SUCCESS: return loadCategoriesSuccess(state, action.payload)
        case LOAD_DISHES_SUCCESS: return loadDishesSuccess(state, action.payload)
        default: return state;
    }
}

export default homeReducer;
import { Reducer } from "redux";
import {
    CategoryDispatchType,
    LoadDishDetail,
    LoadDishDetailSuccess,
    LoadFullCategory,
    LoadFullCategorySuccess,
    LOAD_CATEGORY,
    LOAD_CATEGORY_SUCCESS,
    LOAD_DETAIL_DISH, LOAD_DETAIL_DISH_SUCCESS
} from "../types/categoryTypes";

import { Dish } from "../types/homeTypes";

interface CategoryI {
    id: number | null;
    name: string;
    dishes: Dish[],
    detailDish: Dish,
    loading: boolean
}

const initialDish: Dish = {
    id: 0,
    name: '',
    price: 0,
    image_url: '',
    description: '',
    available: true,
    CategoryId: 0
}

const initialState: CategoryI = {
    id: null,
    name: '',
    dishes: [],
    detailDish: initialDish,
    loading: false,
}


const startLoading = (state: CategoryI, action: LoadFullCategory): CategoryI => {
    return { ...state, loading: true }
}

const categorySucces = (state: CategoryI, action: LoadFullCategorySuccess): CategoryI => {

    const { category, dishes } = action.payload;

    const updatedState: CategoryI = {
        ...state,
        id: category.id,
        name: category.name,
        dishes: dishes,
        loading: false
    }

    return updatedState
}


const startLoadingDetail = (state: CategoryI, action: LoadDishDetail): CategoryI => {

    return { ...state, loading: true }
}

const detailDishSuccess = (state: CategoryI, action: LoadDishDetailSuccess): CategoryI => {


    const { dish } = action.payload;

    return { ...state, detailDish: dish }
}


const categoryReducer: Reducer = (state: CategoryI = initialState, action: CategoryDispatchType): CategoryI => {
    switch (action.type) {
        case LOAD_CATEGORY: return startLoading(state, action);
        case LOAD_CATEGORY_SUCCESS: return categorySucces(state, action);
        case LOAD_DETAIL_DISH: return startLoadingDetail(state, action);
        case LOAD_DETAIL_DISH_SUCCESS: return detailDishSuccess(state, action);
        default: return state;
    }
}

export default categoryReducer;
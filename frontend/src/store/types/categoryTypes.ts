import { Category, Dish } from "./homeTypes"

export const LOAD_CATEGORY = "LOAD_CATEGORY"
export const LOAD_CATEGORY_SUCCESS = "LOAD_CATEGORY_SUCCESS"
export const LOAD_CATEGORY_FAILED = "LOAD_CATEGORY_FAILED"


export const LOAD_DETAIL_DISH = "LOAD_DETAIL_DISH"
export const LOAD_DETAIL_DISH_SUCCESS = "LOAD_DETAIL_DISH_SUCCESS"
export const LOAD_DETAIL_DISH_FAILED = "LOAD_DETAIL_DISH_FAILED"



export interface LoadFullCategory {
    type: typeof LOAD_CATEGORY
}

export interface LoadFullCategorySuccess {
    type: typeof LOAD_CATEGORY_SUCCESS,
    payload: {
        category: Category,
        dishes: Dish[]
    }
}

export interface LoadFullCategoryFailed {
    type: typeof LOAD_CATEGORY_FAILED,
    payload: {
        error: string,
    }
}

export interface LoadDishDetail {
    type: typeof LOAD_DETAIL_DISH
}

export interface LoadDishDetailSuccess {
    type: typeof LOAD_DETAIL_DISH_SUCCESS,
    payload: {
        dish: Dish
    }
}

export interface LoadDishDetailFailed {
    type: typeof LOAD_DETAIL_DISH_FAILED,
    payload: {
        error: string,
    }
}

export type CategoryDispatchType =
    LoadFullCategory |
    LoadFullCategorySuccess |
    LoadFullCategoryFailed |
    LoadDishDetail |
    LoadDishDetailFailed |
    LoadDishDetailSuccess
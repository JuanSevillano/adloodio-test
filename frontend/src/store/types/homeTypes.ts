export const LOAD_HOME = "LOAD_HOME"

export const LOAD_DISHES = "LOAD_DISHES"
export const LOAD_DISHES_SUCCESS = "LOAD_DISHES_SUCCESS"
export const LOAD_DISHES_FAILED = "LOAD_DISHES_FAILED"

export const LOAD_CATEGORIES = "LOAD_HOME_CATEGORIES"
export const LOAD_CATEGORIES_SUCCESS = "LOAD_CATEGORIES_SUCCESS"
export const LOAD_CATEGORIES_FAILED = "LOAD_CATEGORIES_FAILED"


export type Category = {
    id: number;
    name: string;
    image_cover: string;
}

export type Dish = {
    id: number;
    name: string;
    image_url: string;
    description: string;
    price: number;
    available: boolean;
    CategoryId: number;
}


export interface LoadHome {
    type: typeof LOAD_HOME
}

export interface LoadCategory {
    type: typeof LOAD_CATEGORIES
}

export interface LoadCategoriesSuccess {
    type: typeof LOAD_CATEGORIES_SUCCESS,
    payload: {
        categories: Category[]
    }
}

export interface LoadCategoriesFailed {
    type: typeof LOAD_CATEGORIES_FAILED,
    payload: {
        error: string;
    }
}

export interface LoadDishes {
    type: typeof LOAD_DISHES
}

export interface LoadDishesSuccess {
    type: typeof LOAD_DISHES_SUCCESS,
    payload: {
        dishes: Dish[]
    }
}

export interface LoadDishesFailed {
    type: typeof LOAD_DISHES_FAILED,
    payload: {
        error: string;
    }
}


export type HomeDispatchType = LoadHome | LoadCategory | LoadCategoriesSuccess | LoadCategoriesFailed | LoadDishes | LoadDishesSuccess | LoadDishesFailed

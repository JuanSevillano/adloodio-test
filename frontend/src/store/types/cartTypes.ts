export const LOAD_PREV_CART = 'LOAD_PREV_CART'

export const ADD_PRODUCT = 'ADD_PRODCUT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

export const PURCHASE = 'PURCHASE'
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS'
export const PURCHASE_FAILED = 'PURCHASE_FAILED'

export const ORDER_READY = 'ORDER_READY'
export const CREATE_USER = 'CREATE_USER'

export type CartProduct = {
    id: number;
    CategoryId: number;
    name: string;
    quantity: number;
    price: number;
}

export type Order = {
    userId: number;
    dishes: CartProduct[];
    price: number;
}

export type OrderCreated = {
    id: number;
    meals: [],
    UserId: number;
    status: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUser {
    type: typeof CREATE_USER
}

export interface AddProduct {
    type: typeof ADD_PRODUCT,
    payload: { product: CartProduct }
}

export interface RemoveProduct {
    type: typeof REMOVE_PRODUCT,
    payload: { productId: number }
}

export interface LoadPrevCart {
    type: typeof LOAD_PREV_CART
}

export interface PurchaseSuccess {
    type: typeof PURCHASE_SUCCESS,
    payload: { order: OrderCreated; }
}

export interface PurchaseFailed {
    type: typeof PURCHASE_FAILED
}

export interface OrderReady {
    type: typeof ORDER_READY,
    payload: { order: OrderCreated }
}


export type CartDispatchTypes =
    AddProduct |
    RemoveProduct |
    PurchaseSuccess |
    LoadPrevCart |
    PurchaseFailed |
    OrderReady
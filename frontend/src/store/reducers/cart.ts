import { Reducer } from "redux";
import { getPersistance, savePersistance } from "../../utils/utility";
import { AddProduct, ADD_PRODUCT, CartDispatchTypes, CartProduct, LoadPrevCart, LOAD_PREV_CART, OrderCreated, OrderReady, ORDER_READY, PurchaseSuccess, PURCHASE_SUCCESS, RemoveProduct, REMOVE_PRODUCT } from "../types/cartTypes";

type Combo = {
    main: number;
    drink: number;
    desser: number;
}

interface CartI {
    id: number;
    products: Array<CartProduct>,
    orders: Array<OrderCreated>,
    totalPrice: number;
}

const initialState: CartI = {
    id: 0, // userId
    products: [],
    orders: [],
    totalPrice: 0,
}

const loadPrevCart = (state: CartI, action: LoadPrevCart): CartI => {

    const _prevCart = getPersistance('CART');

    return _prevCart ? _prevCart : state

}

const removeProduct = (state: CartI, action: RemoveProduct): CartI => {

    const { productId } = action.payload;

    const found = state.products.find(prod => prod.id === productId)

    if (!found) {
        return state
    }

    const prodPrice = found.price * found.quantity;
    prodPrice.toFixed(2);

    const updatedPrice = state.totalPrice - prodPrice;
    const updatedProds: Array<CartProduct> = state.products
        .filter((prod: CartProduct) => prod.id !== productId);

    const updatedState: CartI = {
        ...state,
        products: updatedProds,
        totalPrice: updatedPrice
    }

    savePersistance('CART', updatedState)

    return updatedState
}


const addProduct = (state: CartI, action: AddProduct): CartI => {

    const { product } = action.payload;

    const productPrice: number = product.price * product.quantity;
    productPrice.toFixed(2)


    const updatedPrice: number = state.totalPrice + productPrice;
    const updatedProds: Array<CartProduct> = [...state.products, product]

    const updatedState: CartI = {
        ...state,
        products: updatedProds,
        totalPrice: updatedPrice
    }

    savePersistance('CART', updatedState);

    return updatedState
}

const purchaseSuccess = (state: CartI, action: PurchaseSuccess): CartI => {

    const { order } = action.payload;

    const udpatedOrders = [...state.orders, order]
    const updatedState: CartI = {
        ...state,
        products: [],
        totalPrice: 0,
        orders: udpatedOrders
    }

    savePersistance('CART', updatedState)
    return updatedState
}

const orderReady = (state: CartI, action: OrderReady): CartI => {

    const { order } = action.payload;

    const foundIndex = state.orders.findIndex((item: OrderCreated) => item.id === order.id);
    const updatedOrders = [...state.orders]

    updatedOrders[foundIndex].status = 1;
    const updatedState = {
        ...state,
        orders: updatedOrders
    }

    savePersistance('CART', updatedState)

    return updatedState
}


const cartReducer = (state: CartI = initialState, action: CartDispatchTypes): CartI => {
    switch (action.type) {
        case LOAD_PREV_CART: return loadPrevCart(state, action)
        case ADD_PRODUCT: return addProduct(state, action)
        case REMOVE_PRODUCT: return removeProduct(state, action)
        case PURCHASE_SUCCESS: return purchaseSuccess(state, action)
        case ORDER_READY: return orderReady(state, action)
        default: return state;
    }
}

export default cartReducer;
import { Reducer } from "redux";
import { getPersistance, savePersistance } from "../../utils/utility";
import { AddProduct, ADD_PRODUCT, CartDispatchTypes, CartProduct, LoadPrevCart, LOAD_PREV_CART, RemoveProduct, REMOVE_PRODUCT } from "../types/cartTypes";


interface CartI {
    id: number;
    products: Array<CartProduct>,
    totalPrice: number;
}

const initialState: CartI = {
    id: 0, // userId
    products: [],
    totalPrice: 0
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

const cartReducer = (state: CartI = initialState, action: CartDispatchTypes): CartI => {
    switch (action.type) {
        case LOAD_PREV_CART: return loadPrevCart(state, action)
        case ADD_PRODUCT: return addProduct(state, action)
        case REMOVE_PRODUCT: return removeProduct(state, action)
        default: return state;
    }
}

export default cartReducer;
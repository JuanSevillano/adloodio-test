import { combineReducers, createStore, Reducer, compose, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";

import cartReducer from "./reducers/cart";
import homeReducer from "./reducers/home";
import categoryReducer from "./reducers/category";


const rootReducer: Reducer = combineReducers({
    home: homeReducer,
    cart: cartReducer,
    category: categoryReducer
})

const store: Store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
));


export default store;
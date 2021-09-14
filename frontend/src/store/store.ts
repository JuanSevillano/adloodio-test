import { combineReducers, createStore, Reducer, compose, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import orderReducer from "./reducers/order.reducer";


const rootReducer: Reducer = combineReducers({
    orders: orderReducer
})

const store: Store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
));


export default store;
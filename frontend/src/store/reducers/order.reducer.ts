import { AnyAction, Reducer } from "redux";

interface OrderI {

}

const initialState: OrderI = {

}

const orderReducer: Reducer = (state: OrderI = initialState, action: AnyAction): OrderI => {
    switch (action.type) {
        default: return state;
    }
}

export default orderReducer;
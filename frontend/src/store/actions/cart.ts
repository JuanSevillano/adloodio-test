import { Dispatch } from "redux";
import axios from "../../app/axiosConfig";
import { CartDispatchTypes, Order, PURCHASE_FAILED } from "../types/cartTypes";

export const purchase = (order: Order) => async (dispatch: Dispatch<CartDispatchTypes>) => {
    try {

        const { data } = await axios.post('/order', { meals: order.dishes })
        console.log('CREATED', data)

    } catch (error) {
        dispatch({
            type: PURCHASE_FAILED
        })
    }
}
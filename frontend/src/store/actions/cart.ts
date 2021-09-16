import { Dispatch } from "redux";
import axios from "../../app/axiosConfig";
import { CartDispatchTypes, Order, PURCHASE_FAILED, PURCHASE_SUCCESS } from "../types/cartTypes";

export const purchase = (order: Order) => async (dispatch: Dispatch<CartDispatchTypes>) => {
    try {

        if (order.dishes.length > 0) {
            const { data } = await axios.post('/order', { meals: order.dishes })

            dispatch({
                type: PURCHASE_SUCCESS,
                payload: { order: data.order }
            })
        }


    } catch (error) {
        dispatch({
            type: PURCHASE_FAILED
        })
    }
}


export const createUser = () => async (dispatch: Dispatch<CartDispatchTypes>) => {
    try {

        await axios.post('/user', {
            name: 'Juan D. Sevillano',
            email: 'sevi0_6@hotmail.com',
            phone: '632802552'
        })


    } catch (error) {

    }
}

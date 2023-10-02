import { cartActions } from "./Cart-Slice";
import { uiActions } from "./UI-Slice";


export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = fetch('https://http-hooks-5b49e-default-rtdb.firebaseio.com//Cart.json')

            if (!response.ok) {
                throw new Error('Could not fetch Cart data')
            }
            const data = response.JSON();
            return data;
        }
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCartHandler({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        }
        catch (error) {
            dispatch(uiActions.ShowNotification({
                status: 'error',
                title: 'Showing Error',
                message: 'Fetching cart failed.....!'
            }))
        }
    }
}

export const sendCartdata = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.ShowNotification({
            status: 'Pending',
            title: 'Pending.....',
            message: 'Sending cart.....!'
        }))

        const sendrequest = async () => {
            const response = await fetch('https://http-hooks-5b49e-default-rtdb.firebaseio.com//Cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
            })

            if (!response.ok) {
                throw new Error('Something wrong')
            }
        }
        try {
            await sendrequest()

            dispatch(uiActions.ShowNotification({
                status: 'success',
                title: 'Success...',
                message: 'Sending cart successfully.....!'
            }))
        } catch (error) {
            dispatch(uiActions.ShowNotification({
                status: 'error',
                title: 'Showing Error',
                message: 'Sending cart failed.....!'
            }))
        }
    }
}
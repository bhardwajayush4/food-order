import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { sendCartdata } from './Store/Cart-actions';
import Notification from './components/UI/Notification';
import { fetchCartData } from './Store/Cart-actions';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.CartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch();

  // useEffect(() => {

  //   const sendCartdata = async () => {
  //     dispatch(uiActions.ShowNotification({
  //       status: 'Pending',
  //       title: 'Pending.....',
  //       message: 'Sending cart.....!'
  //     }))
  //     const response = await fetch('https://send-http-8d45c-default-rtdb.firebaseio.com/Cart.json', {
  //       method: 'PUT',
  //       body: JSON.stringify(cart),
  //     })
  //     if (!response.ok) {
  //       throw new Error('Something wrong')
  //     }

  //     // const responsedata = response.JSON()

  //     dispatch(uiActions.ShowNotification({
  //       status: 'success',
  //       title: 'Success...',
  //       message: 'Sending cart successfully.....!'
  //     }))

  //   }
  //   if(isInitial){
  //     isInitial= false;
  //     return;
  //   }

  //   sendCartdata().catch(error => {
  //     dispatch(uiActions.ShowNotification({
  //       status: 'error',
  //       title: 'Showing Error',
  //       message: 'Sending cart failed.....!'
  //     }))
  //   })
  // }, [cart, dispatch])

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])


  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed){
      dispatch(sendCartdata(cart))
    }

  }, [cart, dispatch])


  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

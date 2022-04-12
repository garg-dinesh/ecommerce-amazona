import React from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import {useSelector, useDispatch} from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { signout } from './actions/userActions';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="row">
              <div>
                  <Link className="brand" to="/">amazona</Link>
                </div>
                <div>
                  <Link to="/cart">
                    Cart
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link>
                  {
                    userInfo ? (
                      <div className='dropdown'>
                      <Link to='#'>
                        {userInfo.name} <i className='fa fa-caret-down'></i>{' '}
                      </Link>
                      <ul className='dropdown-content'>
                        <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                      </ul>
                      </div>
                    ) : (
                      <Link to="/signin">Sign In</Link>
                    )
                  }
                </div>
          </header>
          <main>
            <Routes>
              <Route path="/cart/:id/:qty" element={<CartScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </main>
          <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

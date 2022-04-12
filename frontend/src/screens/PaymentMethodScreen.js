import React, {useState} from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import {savePaymentMethod} from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'

export default function PaymentMethodScreen() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!shippingAddress.address) {
        navigate('/shipping')
    }
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
  return (
    <div>
        <CheckoutSteps step1 step2 step3 />
        <form className='form' onSubmit={submitHandler}>
            <div>
                Payment Method
            </div>
            <div>
                <div>
                    <input
                        type='radio'
                        id='paypal'
                        value='PayPal'
                        name='paymentMethod'
                        required
                        checked
                        onChange={e => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor='paypal'>Paypal</label>
                </div>
            </div>
            <div>
                <div>
                    <input
                        type='radio'
                        id='stripe'
                        value='stripe'
                        name='paymentMethod'
                        required
                        onChange={e => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor='stripe'>Stripe</label>
                </div>
            </div>
            <div>
                <button className='primary' type='submit'>
                    Continue
                </button>
            </div>
        </form>
    </div>
  )
}

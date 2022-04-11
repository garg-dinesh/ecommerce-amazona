import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const redirect = '/';

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    
    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])

  return (
    <div>
        <form className='form' onSubmit={submitHandler}>
            <div>
                <h1>Sign In</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div>
                <label htmlFor="email">Email Address</label>
                <input type='email' id='email' placeholder='Enter email' required
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type='password' id='password' placeholder='Enter password' required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label />
                <button className='primary' type='submit'>
                    Sign In
                </button>
            </div>
            <div>
                <label />
                <div>
                    New Customer? {' '}
                    <Link to='/register'>Create your account</Link>
                </div>
            </div>
        </form>
    </div>
  )
}

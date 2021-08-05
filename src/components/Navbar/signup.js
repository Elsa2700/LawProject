import React, { useRef, useState } from 'react'
import useAuth from './contexts/AuthContext';
import { auth } from '../../database/firebase-service';
import { Link, useHistory } from 'react-router-dom';
import HomePage from '../../page/HomePage';


const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth;
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('密碼不符 😓')
        }
        try {
            setError('')
            setLoading(true)
            console.log(emailRef.current.value, passwordRef.current.value)
            let result = await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            history.push('/')


        } catch (error) {
            setError(error.messag)
        }
        setLoading(false)
    }



    return (
        <>
            <div>
                <div className='member-frame-card'>
                <Link to='/'><i className="gray close icon icon"></i></Link>
                    <h1 className='text-center mb-4'>註冊</h1>
                    {JSON.stringify(currentUser)}
                    {error && <div className='alert' variant='danger'>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div id='email' className='form-group'>
                            <label>信箱</label>
                            <input className='form-control' type='email' ref={emailRef} required />
                        </div>
                        <div id='password' className='form-group'>
                            <label>密碼</label>
                            <input className='form-control' type='password' ref={passwordRef} required />
                        </div>
                        <div id='password-confirm' className='form-group'>
                            <label>密碼確認</label>
                            <input className='form-control' type='password' ref={passwordConfirmRef} required />
                        </div>
                        <button disabled={loading} className='ui inverted olive button' type='submit'>註冊</button>
                    </form>
                </div>
            </div>
            <div className='member-note'>
                已經有帳號了嗎?<Link to='/login'>登入</Link>
            </div>
        </>
    )
}

export default Signup;
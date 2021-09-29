import React, { useRef, useState } from 'react'
import useAuth from './contexts/AuthContext';
import { auth } from '../../database/firebase-service';
import '../../style/member.css';
import { Link, useHistory } from 'react-router-dom';




const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { currentUser } = useAuth;
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            let result = await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            console.log(result.user.email);
            history.push('/');

        } catch (error) {
            console.log(error.message)
            setError('帳號密碼有誤 😓')
        }
        setLoading(false)
    }


    return (
        <>
            <div className='member-frame-card' >
                <Link to='/'><i className="gray close icon icon"></i></Link>
                <h1>會員登入</h1>
                {JSON.stringify(currentUser)}
                {error && <div className='alert' variant='danger'>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div id='email' className='form-group'>
                        <label>信箱</label>
                        <input className='form-control' type='email' ref={emailRef} required />
                    </div >
                    <div id='password' className='form-group'>
                        <label>密碼</label>
                        <input className='form-control' type='password' ref={passwordRef} required />
                    </div>
                    <button disabled={loading} className='ui inverted olive button' type='submit'>登入</button>
                </form>
            </div>

            <div className='member-note'>
                是新用戶嗎?<Link to='/signup'>註冊</Link>
            </div>
        </>
    )
}

export default LogIn;
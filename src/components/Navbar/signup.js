import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert} from 'react-bootstrap';
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
            return setError('密碼不符')
        }
        try {
            setError('')
            setLoading(true)
            console.log(emailRef.current.value, passwordRef.current.value)
            let result = await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            history.push('/')

            // let result = await signup(emailRef.current.value, passwordRef.current.value) //undefined
            console.log(result)


        } catch (error) {
            // console.log(signup,emailRef.current.value, passwordRef.current.value)
            setError(error.messag)
        }
        setLoading(false)
    }



    return (
        <>
            <Card >
                <Card.Body>
                    <h2 className='text-center mb-4'>註冊</h2>
                    {JSON.stringify(currentUser)}
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>信箱</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>密碼</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>密碼確認</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit'>註冊</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                已經有帳號了嗎?<Link to='/login'>登入</Link>
            </div>
        </>
    )
}

export default Signup;
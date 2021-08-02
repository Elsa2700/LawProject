import { SerializationError } from '@elastic/elasticsearch/lib/errors';
import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import useAuth from './contexts/AuthContext';
import { auth } from '../../database/firebase-service';
import '../../style/member.css';
import {Link, useHistory} from 'react-router-dom';



const Logout = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth;
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
            setError('登入失敗')
        }
        setLoading(false)
    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>登入</h2>
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
                        <Button disabled={loading} className='w-100' type='submit'>登入</Button>

                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                是新用戶嗎?<Link to='/signup'>註冊</Link>
            </div>


        </>
    )
}

export default Logout;
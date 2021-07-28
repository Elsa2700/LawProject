import React, { useContext, useState, useEffect, createContext} from 'react';
import {auth} from '../../../database/firebase-auth'


const AuthContext = createContext()

const useAuth = () => {
    return (
        useContext(AuthContext)
    )
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>

    )
}
export { AuthProvider};
export default useAuth

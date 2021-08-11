import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../style/member.css';
import { auth } from '../../database/firebase-service';
import Context from '../../context';

const NavBar = () => {
    const { user } = useContext(Context);
    const [errormsg, setErrormsg] = useState('');
    const history = useHistory();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            let result = await auth.signOut();
            console.log(result, '登出狀態');
            history.go(0)
        } catch (error) {
            setErrormsg(error.messag);
            return errormsg;
        }
    }

    const LoginBtn = () => {
        return (
            <ul className="member-frame">
                <Link to='/login'><li className="member-frame-style" >登入</li></Link>
                <Link to='/signup'><li className="member-frame-style" >註冊</li></Link>
            </ul>
        )
    }

    const LogoutBtn = () => {
        return (
            <ul className="member-frame">
                <Link to='/'><li onClick={handleLogout} className="member-frame-style" >登出</li></Link>
                <Link to='/signup'>
                    <li className="member-name">
                    <div className="member-gif"></div>
                    <div>
                    <span>welcome </span>
                        <div>{user.email}</div>
                    </div>
                    </li>
                </Link>
            </ul>
        )

    }

    const LoggedState = () => {
        const isLoggedIn = user.email;
        console.log('登入狀態', isLoggedIn);
        if (isLoggedIn !== undefined) {
            return <LogoutBtn />
        }
        return <LoginBtn />
    }



    return (
        <div className="nav">
            <ul className="menu-frame">
                <Link to='/'><li>首頁</li></Link>
                <Link to='/mynote'><li>我的筆記</li></Link>
            </ul>
            <LoggedState isLoggedIn={user.email} />
        </div>
    )
}

export default NavBar;
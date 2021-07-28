import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <div className="nav">
            <ul className="menu-frame">
                <Link to='/'><li>首頁</li></Link>
                <Link to='/myblank'><li>法規查詢</li></Link>
                <Link to='/mynote'><li>我的筆記</li></Link>
            </ul>
            <ul className="member-frame">
                <Link to='/signup'><li className="member-frame-style" >登入</li></Link>
                <Link to='/'><li className="member-frame-style" >註冊</li></Link>
            </ul>
        </div>
    )
}

export default NavBar;
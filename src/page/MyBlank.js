import React from 'react';
import NavBar from '../components/Navbar/nav';
import Root from '../components/Navbar/root';
import '../style/MyBlank.css';

const MyBlank = () =>{
    return (
        <div>
            <NavBar />
            <div><i className="massive gray tag icon"></i></div>
            <Root />

        </div>

    )
}


export default MyBlank;
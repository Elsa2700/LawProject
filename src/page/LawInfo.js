import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar/nav';
import Header from '../components/Header/header';
import Root from '../components/Navbar/root';
import LawTool from '../components/LawHeader/LawTool';
import LawHeader from '../components/LawHeader/LawHeader'
import LawChapter from '../components/LawHeader/LawChapter';
import LawMain from '../components/LawMain/LawMain';
import {useLocation} from 'react-router-dom'
import {BrowserRouter as Router,Switch,Route,useParams} from "react-router-dom";


const LawInfo = () =>{
    const location = useLocation();
    console.log(location.state)
    return (
        <div>
            <NavBar />
            <LawTool />
            <LawHeader/>
            <LawChapter />
            <LawMain />            
            <Root />
        </div>
    )
}


export default LawInfo;
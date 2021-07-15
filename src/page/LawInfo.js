import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar/nav';
import Header from '../components/Header/header';
import Root from '../components/Navbar/root';
import LawTool from '../components/LawHeader/LawTool';
import LawHeader from '../components/LawHeader/LawHeader'
import LawChapter from '../components/LawHeader/LawChapter';
import LawMain from '../components/LawMain/LawMain';
import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";


const LawInfo = (props) => {
    const location = useLocation();
    return (
        <div>
            <NavBar />
            <LawTool />
            <LawHeader LawInfo={props.location.state.lawinfo} />
            <LawChapter LawInfo={props.location.state.lawinfo} />
            <LawMain LawInfo={props.location.state.lawinfo} />
            <Root />
        </div>
    )
}


export default LawInfo;
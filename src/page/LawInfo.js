
import React, { Component,useEffect, useState } from 'react';
import NavBar from '../components/Navbar/nav';
import Header from '../components/Header/header';
import Root from '../components/Navbar/root';
import LawTool from '../components/LawHeader/LawTool';
import LawHeader from '../components/LawHeader/LawHeader'
import LawMain from '../components/LawMain/LawMain';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";


const LawInfo = ({location}) => {
    return (
        <div>
            <NavBar />
            <LawHeader LawInfo={location.state.lawinfo} />
            <LawMain LawInfo={location.state.lawinfo} />
            <Root />
        </div>
    )
}



export default LawInfo;
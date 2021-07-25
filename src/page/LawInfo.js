
import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar/nav';
import Header from '../components/Header/header';
import Root from '../components/Navbar/root';
import LawTool from '../components/LawHeader/LawTool';
import LawHeader from '../components/LawHeader/LawHeader'
import LawMain from '../components/LawMain/LawMain';
import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
const ThemeContext = React.createContext('light');


const LawInfo = (props) => {
    console.log(props.location.state.lawinfo) //需要傳遞的陣列資料
    const [listLawInfo, setlistLawInfo] = useState([]); //建立list存需要存陣列資料

    useEffect(() => {
        setlistLawInfo(props.location.state.lawinfo);
        console.log(listLawInfo);  //有陣列資料
    }, [props.location.state.lawinfo]);

    console.log('list',listLawInfo) //無陣列資料
  
    return (
        <div>
            <NavBar />
            <LawTool />
            <LawHeader/>
            <LawMain LawInfo={listLawInfo} />
            <Root />
        </div>
    )
}



export default LawInfo;

import React from 'react';
import NavBar from '../components/Navbar/nav';
import Root from '../components/Navbar/root';
import LawHeader from '../components/LawHeader/LawHeader'
import LawMain from '../components/LawMain/LawMain';


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
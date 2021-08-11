
import React from 'react';
import NavBar from '../components/Navbar/nav';
import Root from '../components/Navbar/root';
import LawHeader from '../components/LawHeader/LawHeader'
import LawMain from '../components/LawMain/LawMain';
import PropTypes from "prop-types";


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
LawInfo.propTypes = {
    location: PropTypes.object.isRequired,
  };




export default LawInfo;
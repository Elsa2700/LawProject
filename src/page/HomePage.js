
import React from 'react';
import NavBar from '../components/Navbar/nav';
import Root from '../components/Navbar/root';
import Header from '../components/Header/header';
import "../style/homepage.css"
import LawMenu from '../components/LawMenu/LawMenu';

class HomePage extends React.Component {
    render() {

        return (
            <div>
                <NavBar />
                <Header />
                <LawMenu/>
                <Root />
            </div>
        )

    }
}



export default HomePage;
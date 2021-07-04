import React from 'react';
import Slogan from './slogan';
import SearchBar from './searchbar';

const Header = () => {
    return (
        <div className="header-frame">
            <Slogan/>
            <SearchBar/>
        </div>
    )
}

export default Header;